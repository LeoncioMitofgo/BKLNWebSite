import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Supabase in production: what nobody tells you',
  excerpt: 'We run Supabase in several live projects. Here’s what we’ve learned: RLS done right, Realtime without memory leaks, multi-method auth and the real limits of the free plan.',
  content: `## Why we use Supabase

At BKLN we run Supabase in production across several different projects: a C2C marketplace, a dating platform, a school management system and a corporate website with forms. It’s not a casual choice — it’s the tool that best balances productivity, control and cost for the kind of projects we build.

But Supabase has nuances the documentation doesn’t always cover. Here’s what we’ve learned.

## Row Level Security: get it right from the start

RLS is the feature that most confuses teams coming from Firebase. In Firebase, access control lives in security rules separate from the schema. In Supabase it lives directly in PostgreSQL.

The temptation during development is to disable RLS to move faster. **Don’t.** It’s much harder to add it later than to design it in from the start.

The pattern we use in all our projects:

\`\`\`sql
-- Enable RLS on every user table
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users only see their own messages
CREATE POLICY "users_see_their_messages"
ON messages FOR SELECT
USING (
  auth.uid() = sender_id OR
  auth.uid() = receiver_id
);

-- Only the sender can insert
CREATE POLICY "users_insert_their_messages"
ON messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);
\`\`\`

The most common mistake: forgetting that RLS also applies to Realtime subscriptions. If you have a restrictive SELECT policy, your Realtime channel will only receive the changes that policy allows. That’s good for security, but it can be confusing if you don’t know it.

## Realtime without memory leaks

Supabase Realtime is powerful but requires manual subscription management. If you open channels without closing them, you pile up connections that consume resources on the client and the server.

In plain JavaScript (without React hooks to clean up automatically), this is the pattern we follow:

\`\`\`javascript
let activeChannel = null

function subscribeToConversation(conversationId) {
  // Clean up the previous channel if there is one
  if (activeChannel) {
    supabase.removeChannel(activeChannel)
    activeChannel = null
  }

  activeChannel = supabase
    .channel(\`conv:\${conversationId}\`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: \`conversation_id=eq.\${conversationId}\`
    }, handleNewMessage)
    .subscribe()
}

// When leaving the view
function cleanUp() {
  if (activeChannel) {
    supabase.removeChannel(activeChannel)
    activeChannel = null
  }
}
\`\`\`

The rule: for every \`channel()\` you open, you need a \`removeChannel()\` once you no longer need it.

## Multi-method auth without the complexity

Supabase Auth supports email/password, magic links, OAuth (Google, GitHub, etc.) and SMS OTP. The trick is that they all share the same session — you don’t have to manage several authentication systems.

What you do have to manage: the onboarding flow after the first login. With OAuth, the user arrives with an email but without the profile data you need. The pattern we use is a PostgreSQL trigger:

\`\`\`sql
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, created_at)
  VALUES (NEW.id, NEW.email, NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();
\`\`\`

That way, whatever the login method, a profile is always available immediately.

## The real limits of the free plan

Supabase’s free plan is generous for development and small projects, but it has limits worth knowing before you launch:

- **500 MB of database** — enough to start with, limiting if you store files or logs in the DB
- **2 GB of bandwidth** — the easiest to hit if you serve images from Supabase Storage
- **50,000 monthly active users** — hardly a problem at the beginning
- **Projects paused** after 7 days of inactivity — this one really is annoying during development

For production projects with real traffic, the Pro plan ($25/month) is the right option. But for an MVP, the free plan goes much further than it seems.

## Our verdict after several projects

Supabase is the best option we know of for projects where you want a real PostgreSQL database (with all its capabilities: functions, triggers, indexes, full-text search) without managing infrastructure.

The RLS learning curve is real, but it’s worth it. Once you understand it, it gives you a level of control over who accesses what that Firebase simply doesn’t have.

Would we use it for a project with millions of users? It would depend on the case. For the projects we build — business applications, niche platforms, management systems — it’s exactly the tool we need.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'The BKLN Software & Systems development team.',
  },
  tags: ['Supabase', 'PostgreSQL', 'RLS', 'Realtime', 'Auth'],
}
