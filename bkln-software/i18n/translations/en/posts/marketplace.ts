import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'How we built a marketplace for Equatorial Guinea',
  excerpt: 'Basic phones, 3G and hardly anyone with a card. The seven decisions behind BKLN Marketplace, our classified ads website for the whole country.',
  content: `## Where we started

[BKLN Marketplace](/portfolio/bkln-marketplace) is our own product: a classified ads website for the whole of Equatorial Guinea, where anyone can sell a car, rent out a flat or find a second-hand phone, and where businesses can have their own shop.

Before writing a single line of code, we put in writing what it would be and what it wouldn’t. Three facts about the market shaped everything else:

- **Almost everyone browses on their phone**, often a basic Android.
- **Connections are slow and data is expensive.** Every megabyte the website downloads is paid for by the user.
- **Very few people pay by card.** Cash, bank transfers and money transfer agencies are the norm.

These seven decisions follow from that.

## 1. A website, not an app

If someone sends you an ad on WhatsApp, you should be able to open it straight away, without installing anything. That’s why BKLN Marketplace is a website: it’s shared with a link, it opens on any phone and Google can find the ads.

People who use it every day can **install it on their home screen**: it gets its own icon, opens without the browser bar and alerts them to new messages, just like an app. No app store, and no space taken up on the phone.

## 2. Designed for a 360-pixel screen

Every screen was designed first for the width of a small phone, 360 pixels, and then for the computer. Buttons are at least 44 pixels so they can be tapped with a thumb, the main action always sits at the bottom and nothing spills off the screen. The first real ad was posted from an Android phone, not from a computer.

## 3. Photos are compressed on the phone itself

A photo taken with a phone weighs between 3 and 5 MB. Uploading five on 3G is slow and eats the seller’s data. So the website converts each photo to WebP and shrinks it **on the phone itself, before uploading it**, and strips out the location data the camera saves.

In the first real ad, three photos took up between 14 and 127 KB each. And since the server doesn’t have to process images, the platform costs less to run.

## 4. A single round trip per screen

The servers are in Europe. Each trip from Malabo takes about 150 milliseconds, so what matters is not only how fast the server is, but **how many times you have to go there and back**.

Each screen is prepared on the server with all its data requested at once, and reaches the phone in one go. Public pages, such as ads or categories, are cached and served instantly. The phone gets a page that is ready to read, without waiting for pieces to load one after another.

## 5. The seller’s phone number isn’t public

On many classified sites the seller has to post their number, and from then on anyone can get it. On BKLN Marketplace people talk through an **in-app chat**, in real time and with photos, and the seller gets an alert on their phone when someone writes.

If the seller wants, they can add a WhatsApp or call button, but **only signed-in users see it**. The number never appears on the public page or on Google. And the chat reminds buyers of the basics: don’t pay in advance and meet in a public place.

## 6. A paid plan without a payment gateway

The Premium plan gives more ads, more photos, a place among the featured ads and a shop with its own address. To charge for it we didn’t add a card payment gateway, because most sellers wouldn’t use it. It’s paid **at our office in Malabo** or, from another city, **through a money transfer agency**, sending the transfer code on WhatsApp. The team activates it from the admin panel, with its end date.

Each plan’s limits (ads at once, photos, how many days an ad lasts) live in a configuration that can be changed from the panel, not scattered through the code. And the platform is ready to add mobile payments when the time comes, without rebuilding it.

## 7. Moderation that doesn’t depend on someone watching all day

A classified ads site lives on trust. Any user can **report** an ad or a conversation, and after three reports the ad is hidden automatically until a moderator reviews it. Banned words are matched as whole words, so normal ads aren’t blocked by mistake, and anyone can block another person.

Permissions don’t live only on the screen: the database itself checks that each user can only see and change their own data. Even if someone tampers with a request, they can’t read someone else’s messages or give themselves Premium.

## How we test it

More than 500 automated checks run through the real flows, in the database and in a phone-sized browser: signing up, posting with photos, searching with filters, chatting between two browsers at once, reporting, requesting Premium and moderating from the panel. And before opening it to the public, we’ll test it on low-end Android phones on a slow network, which is how people will use it.

Under the hood we use Next.js and React for the website, Supabase (PostgreSQL, real time and photo storage) for the data, and Vercel to serve it.

## What applies to any platform

These decisions aren’t just for a marketplace. A job board, a booking system or a delivery platform in Equatorial Guinea faces the same things: basic phones, expensive data and payments without cards. If you’re thinking about a platform like that, also read [How much does a website or an app cost in Equatorial Guinea?](/blog/cuanto-cuesta-web-app-guinea-ecuatorial) and tell us about your idea.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'The BKLN Software & Systems development team.',
  },
  tags: ['Marketplace', 'Equatorial Guinea', 'Mobile', 'Next.js', 'Supabase'],
}
