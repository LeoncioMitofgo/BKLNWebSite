import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'The real cost of what you import: freight, customs and the margin you think you make',
  excerpt: 'If you set your prices from what you pay the supplier, you probably earn less than you think. What to add to each imported product, how to spread it and how to stop doing it by hand.',
  content: `## The supplier’s price is not your cost

In Equatorial Guinea almost everything that is sold comes from abroad: from Europe, Asia, Cameroon or Dubai. And almost every business sets its prices the same way: what they pay the supplier, plus a percentage.

The problem is that the supplier’s price is only part of what a product costs you once it is in your warehouse. The rest comes later, on other bills, sometimes weeks afterwards: the ship or the plane, customs, the port, the truck to your warehouse. If you don’t add it to each product, you are setting your prices on a cost that isn’t the real one.

## What to add

What accountants call **landed costs** usually include:

- **The supplier’s price**, converted to CFA francs at the exchange rate on the day you pay. With the euro it is easy, because the parity is fixed (1 euro = 655.957 FCFA); with the dollar, the rate moves.
- **Freight**, by sea or air, and cargo insurance if you take it out.
- **Customs**: import duties, taxes and fees.
- **The port and the forwarding agent**: handling, storage if the goods wait, and the fees of whoever does the paperwork.
- **Transport from the port or airport to your warehouse.**
- **Bank charges** on the international transfer, if they are significant.

## An example with numbers

Take a demo order from a European supplier: 28 pieces of IT equipment worth 5,710,000 FCFA. Three more bills arrive afterwards: freight of 480,000 FCFA, customs of 1,350,000 FCFA and transport from the port to the warehouse of 85,000 FCFA. In total, 1,915,000 FCFA more, 33% of the order’s value.

One of those items, a laptop, cost 410,000 FCFA on the supplier’s invoice. Once the costs are spread, its real cost in the warehouse is **544,436 FCFA**.

Now imagine you sell it for 565,000 FCFA. If you calculate the margin from the supplier’s price, you think you make 155,000 FCFA per laptop. In reality you make about **20,500**. Multiply that by every product and every order in the year.

## How to spread the costs

A shipment’s costs have to be spread across the products that arrived in it. There are several ways, and each makes sense for a type of cost:

- **By value:** each product takes a share proportional to what it cost. This is the most common method for customs, because duties are calculated on value.
- **By quantity:** each unit takes the same amount. Useful for costs that don’t depend on value, such as unloading or moving boxes.
- **By weight or volume:** the fairest for freight when you mix light and heavy products in the same container.

What matters is to choose a method, always apply it the same way and do it for every shipment, not by guesswork once a year.

## Average cost: when the same product arrives several times

If you buy the same product in several shipments, each will arrive with a different cost, because freight, the dollar rate or duties change. The most practical approach is to work with **average cost**: each new receipt is blended with what you already had in the warehouse and the unit cost is recalculated. That way your margins reflect what the stock you are selling today really cost you.

## In Excel or in a system

You can do it in Excel, and that is far better than not doing it at all. But it takes discipline: keeping every bill for each shipment, spreading them by hand, updating each product’s cost and not getting a single formula wrong. And when you need the figure, to set a price or negotiate a discount, it is usually out of date.

An ERP such as Odoo does it as part of the daily work. You receive the goods into the warehouse, record the freight, customs and transport bills linked to that receipt, choose how to spread each cost, and the system updates the cost of each product. From then on, every sale shows its real margin and the accounts record the correct value of the inventory.

## How we do it at BKLN

In [our demo Odoo](/portfolio/bkln-en-odoo) you can see exactly this example: the order in euros, the receipt into the Malabo warehouse, the landed costs spread out and the cost of each product updated.

If you import and want to know how much you really make on each product, [we’ll help you set it up](/servicios/erp-odoo-sap), with Odoo or, if you don’t need it yet, with a well-built spreadsheet.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'The BKLN Software & Systems development team.',
  },
  tags: ['Imports', 'Costs', 'Inventory', 'ERP', 'Equatorial Guinea'],
}
