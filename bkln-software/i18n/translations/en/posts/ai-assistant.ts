import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'An AI assistant that answers for you on WhatsApp and on your website',
  excerpt: 'It answers your customers at any time using the information you give it, takes orders and sends you reports. How it really works, what permissions to give it and where its limits are.',
  content: `## What it is, and what it isn’t

An AI assistant is a program that chats in writing with your customers, on WhatsApp or in your website’s chat, and answers them the way someone on your team would. The difference from the bots of the past, the “type 1 for prices” kind, is that it understands questions written naturally, even with typos or awkward phrasing, and replies in normal sentences.

What it isn’t: it’s not an employee with their own judgement, and it doesn’t magically know anything about your business. It knows what you give it and does what you allow it to do.

## How it knows what it knows

There is often some confusion here. The assistant doesn’t learn on its own by reading your conversations, nor does it train itself. What it does is look things up in a body of information that you prepare:

- Your catalogue, with prices and availability.
- Opening hours, location and payment methods.
- Frequently asked questions and their answers.
- Terms for delivery, returns or bookings.
- If it’s for your professional profile: your services, your experience, your rates and the way you work.

When a customer asks something, the assistant searches that information for what’s relevant and writes its answer from there. If the answer isn’t there, the right thing is for it to say so and hand the conversation over to a person, not to make something up.

That’s why an assistant is only as good as the information you give it. If you change a price and don’t update it, it will keep quoting the old price.

## Where it can answer

- **WhatsApp.** That’s where your customers are. To connect an assistant you need Meta’s WhatsApp Business platform (the API), not the regular phone app. Bear in mind that a dedicated number is normally used, that Meta may ask you to verify your business and that it charges for some messages, especially those your business sends without the customer having written first. Also, if a customer hasn’t written to you in more than 24 hours, you can only contact them using message templates approved by Meta.
- **Your website’s chat.** A conversation window on your page, like the one at the bottom right of this one.
- **Email.** It can read what arrives at an address, answer the simple messages and leave the rest sorted for you.
- **Other channels**, such as Messenger or Instagram, can be added with a bit more integration work.

One advantage: it’s the same assistant on every channel, with the same information. You change something once and it applies everywhere.

## What it can do for you

- **Answer at any time**, including at night and at weekends.
- **Take orders or bookings.** It collects what the customer wants, how many units, the address or the date, and records it so that you or your team can confirm it.
- **Report on the status of an order.** If it’s connected to your system, it can check where an order is and answer the “when will mine arrive?” question.
- **Schedule appointments**, if you connect it to your calendar.
- **Hand over to a person** when the customer asks for it, when it doesn’t know the answer or when it detects a complaint.
- **Produce reports.** A daily or weekly summary: how many conversations there were, what people asked most, which orders came in and — very useful — which questions it couldn’t answer. That list tells you exactly what information it’s missing.
- **Answer in several languages.** Spanish, French or English, depending on how the customer writes. Don’t expect the same level in local languages.
- **Understand voice notes**, if it’s set up to transcribe them. On WhatsApp many people prefer to send audio messages, so it’s worth asking for this from the start.

## Permissions: you decide how far it goes

Being able to answer on your behalf doesn’t mean it can do everything. The sensible approach is to give it permissions in levels:

1. **Information only.** It answers with the information you’ve given it. This is the recommended starting point.
2. **Collecting details.** It takes orders, bookings or requests, which stay pending until someone confirms them.
3. **Acting within rules.** It confirms orders or appointments by itself, but only within clear limits: available time slots, products in stock, maximum amounts.
4. **Asking permission for anything sensitive.** Discounts, returns, price changes or any unusual commitment: the assistant prepares it and you approve it with a tap.

And there are things it should never do: make up prices or terms, share one customer’s details with another, or treat a payment that nobody has checked as valid.

## For your professional profile too

It’s not just for shops. If you’re a consultant, a lawyer, a trainer or self-employed, an assistant can present your services, answer common questions, screen who contacts you and suggest an appointment in your diary. You arrive at the meeting already knowing what the other person needs.

A tip: keep the professional and the personal clearly separate. Only give it information you’re happy for anyone to read, because anyone can ask it.

## The limits worth knowing

- **It can make mistakes.** With good information it rarely gets things wrong, but it isn’t infallible. Review conversations from time to time, especially at the beginning.
- **It doesn’t replace important relationships.** A major customer or a serious complaint deserves an answer from you.
- **Say that it’s an assistant.** Your customers need to know they’re talking to an automated assistant and how to reach a person. It builds more trust than trying to hide it.
- **It has a usage cost.** On top of the setup, each conversation uses the AI service and, on WhatsApp, may incur a cost from Meta. Ask how it’s calculated before you start.
- **It needs maintaining.** When your prices, your opening hours or your products change, its information has to be updated.

## How to get started

1. **Gather the information:** catalogue, prices, opening hours, frequently asked questions and terms. If you already have them in documents or on your website, that works.
2. **Start with the website chat**, which is simpler, and add WhatsApp later.
3. **For the first few weeks, only give it permission to provide information.**
4. **Every week, review the questions it couldn’t answer** and fill in its information.
5. **Widen its permissions** (orders, appointments) once you trust the way it answers.

## How we do it at BKLN

BrookAI is our assistant for businesses. It answers only with the documents you upload (catalogues, manuals, FAQs, price lists), works on your website with a code snippet and on WhatsApp Business, and hands the conversation over to a person when it doesn’t know the answer. From its dashboard you upload documents, set its name and tone, review the history and see which questions it couldn’t answer. Connections to your email, your calendar or your ordering system are custom-built, depending on what you need.

You can try an assistant like this right now: the chat on this website works this way and only answers with information about BKLN.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'The BKLN Software & Systems development team.',
  },
  tags: ['Artificial intelligence', 'WhatsApp', 'Customer service', 'Automation'],
}
