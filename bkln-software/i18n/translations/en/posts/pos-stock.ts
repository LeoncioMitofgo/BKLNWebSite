import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Cash register, stock and control from your phone: a guide for pharmacies, supermarkets and restaurants',
  excerpt: 'What a management system for your business should have: a cash register that balances, stock that is always up to date, permissions for each employee and your business on your phone even when you’re away. With the specifics for pharmacies, supermarkets, restaurants and bars.',
  content: `## The problem: not knowing what happens when you’re not there

If you run a pharmacy, a supermarket or a restaurant, this probably sounds familiar: at closing time the cash register doesn’t balance and nobody knows why. A product runs out without anyone noticing. You find out something has expired when it’s already in the bin. And if you’re not on the premises, the only way to know how the day is going is to phone.

A management system, also called a point-of-sale (POS) system, solves much of this. It’s not just a modern cash register: it’s the record of everything that comes in, goes out and gets paid for in your business, and you can check it from your phone.

## The four pieces of a good system

### 1. The cash register

This is where everything starts. Every sale is recorded with its products, amount, time and who made it. What it should have:

- **Opening and closing by shift.** The cashier opens with a starting float and, at closing, the system calculates what there should be. If the cash counted doesn’t match, the discrepancy is recorded with a name and a time.
- **Several payment methods.** Cash, bank transfer, mobile payment or card, and the option to combine them in a single sale.
- **Printed or digital receipt.** A small thermal printer is enough; the receipt can also be sent by WhatsApp.
- **Voids and discounts under control.** A cashier shouldn’t be able to delete a sale or apply a large discount without a manager’s approval. Every void is recorded.

### 2. The inventory

- **Stock that updates itself.** If you sell a box of paracetamol, the system deducts one unit. No need to count by hand to know what’s left.
- **Goods received.** When a supplier’s order arrives, it’s recorded and the stock goes up.
- **Low-stock alerts.** You set a minimum for each product and the system warns you before it runs out.
- **Regular stock counts.** Counting what’s on the shelves from time to time and comparing it with what the system says brings shrinkage, breakage and theft to light.

### 3. Users and their permissions

Each person logs in with their own account or a PIN and can only do what their job requires. A typical split:

- **Owner:** sees everything, from anywhere: reports, margins and all locations.
- **Manager or supervisor:** manages products and prices, approves voids and discounts, closes the till and reviews their location’s reports.
- **Cashier:** sells and takes payment. Can’t change prices or delete sales.
- **Waiter**, in restaurants and bars: opens tables and takes orders; payment is closed at the till.
- **Storeroom:** records goods received and stock counts, with no access to the till.

Having every action signed by whoever did it isn’t about distrusting your team. It’s what lets you clear up a discrepancy in five minutes instead of arguing about it for a week.

### 4. Your business on your phone

This is where the real change happens. From your phone, wherever you are, you can see:

- The day’s sales in real time, by till and by location.
- Best-selling products and the busiest hours.
- Each employee’s sales.
- Alerts for low stock, products about to expire, voids or discrepancies.
- An end-of-day summary that reaches you without having to ask for it.

If you have more than one location, they all appear on the same dashboard.

## What each business needs

### Pharmacies

- **Batches and expiry dates.** Each delivery is recorded with its batch and date, and the system warns you in good time about what is going to expire, so you can sell it first or return it to the supplier.
- **First to expire, first out.** When selling, the system tells you which batch to dispense.
- **Quick search** by brand name or by active ingredient, to offer an alternative when a medicine runs out.
- **A record of prescription-only medicines sold**, if you need to keep track of them.

### Supermarkets and shops

- **Barcode scanner.** Checking out by scanning is faster and avoids pricing mistakes.
- **Products sold by weight**, with a connected scale or at least a price per kilo.
- **Thousands of products** organised by category and supplier, with bulk price changes.
- **Purchasing from suppliers:** what to order, how much and from whom, based on what actually sells.
- **Margin per product**, so you know what makes you money and what just takes up shelf space.

### Restaurants and bars

- **Table plan.** At a glance, which tables are free, occupied or waiting to pay.
- **Orders sent to the kitchen and the bar.** The waiter takes the order on a phone or tablet and it goes straight to the kitchen, printed or on a screen. No more lost slips of paper.
- **Splitting the bill** between several people or taking each part separately.
- **Ingredient control.** If a burger uses 150 grams of meat, each sale deducts that amount from the storeroom. That way you know how much should be left and you spot waste.
- **The cost of each dish** based on its ingredients, so you can set prices sensibly.

## What to keep in mind here

- **It must keep working without internet.** If the connection drops, the till has to keep selling and sync when it comes back. Always ask what happens offline before choosing a system.
- **Power cuts.** A terminal with a battery or a small uninterruptible power supply (UPS) prevents losing a sale halfway through.
- **Payments without cards.** The system must properly record cash, bank transfers and mobile payments, which make up most transactions in many businesses.
- **Simple equipment.** An Android terminal or tablet, a receipt printer, a cash drawer and, if you sell many products, a barcode scanner. You don’t need an expensive computer.
- **Backups.** Your sales and your inventory are your business’s memory: make sure they are also stored off the premises.

## How to roll it out without stopping the business

1. **Load the catalogue:** products, prices and, if you have them, barcodes. If they are already in an Excel sheet, ask whether they can be imported.
2. **Do an initial stock count** so that the starting stock is real.
3. **Create the users** with their permissions.
4. **Train the team** with test sales before opening.
5. **Start with a single till or a single shift** and expand once everything works.
6. **Review the first cash-up** together with the manager.

## How much it costs

There are systems with a monthly subscription and systems with their own licence, and on top of that you have to add the equipment. What usually drives the price up is what’s specific to your business: scales, several locations, kitchen orders or custom reports. If you want to understand what drives the price of a software project, read [How much does a website or an app cost in Equatorial Guinea?](/blog/cuanto-cuesta-web-app-guinea-ecuatorial).

## How we do it at BKLN

We have developed a [point-of-sale system for Android terminals](/portfolio/sistema-pos-android-comercios) with a cash register, end-of-shift cash-up validated on the server, receipt printing, PIN access for each operator and a mobile dashboard from which the owner follows sales in real time. It keeps selling when the connection fails and syncs as soon as it returns. On that base we adapt what your business needs: batches and expiry dates for a pharmacy, barcodes for a supermarket, or tables and kitchen orders for a restaurant.

Tell us how your business works today and we’ll suggest how to organise it.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'The BKLN Software & Systems development team.',
  },
  tags: ['Point of sale', 'Business management', 'Inventory', 'Restaurants'],
}
