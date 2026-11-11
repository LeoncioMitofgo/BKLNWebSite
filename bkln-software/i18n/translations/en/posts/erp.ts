import type { PostText } from '../../../content'

export const post: PostText = {
  title: 'Odoo, SAP or Excel: which management system does your company need in Equatorial Guinea?',
  excerpt: 'When Excel stops being enough, what an ERP really is, how Odoo and SAP differ, and what to look at in Equatorial Guinea: SYSCOHADA accounting, CFA francs, imports, connectivity and power.',
  content: `## Signs that Excel has reached its limit

Excel is a great tool to start with. The trouble comes when the company grows and every department has its own: purchasing in one file, the warehouse in another, sales in a third, and the accounts in a separate program where someone types everything in again. Some signs that it is time to change:

- **The numbers don’t add up at the end of the month** and days go by looking for the difference.
- **Nobody knows what is in the warehouse** without going to count it or phoning someone.
- **You don’t know what your imports really cost**, because freight and customs arrive on separate bills, weeks later.
- **You buy in euros or dollars and sell in CFA francs**, and everyone works out the exchange rate their own way.
- **Hours or services slip through without being invoiced** because nobody matches the work done with what was billed.
- **Everything depends on one person** who knows where each file is.

If three or more sound familiar, what you probably need is an ERP.

## What an ERP is, in one sentence

An ERP is a system where the company’s whole operation lives in a single database: what you buy, what you have, what you sell, what you are owed and what you owe. When goods come in, stock goes up and the accountant sees the supplier’s bill waiting to be paid. When a sale goes out, stock goes down and the invoice is created automatically. Nobody copies data from one place to another.

## The three realistic options

**1. Excel and an invoicing program.** Enough for a small business with few products and one person who controls everything. Cheap, but it doesn’t scale and doesn’t connect the warehouse to the accounts.

**2. Odoo.** An open-source ERP, widely used by small and mid-sized companies around the world, that works through apps: Purchasing, Inventory, Sales, Invoicing and Accounting, Projects, Employees, Maintenance… You install only the ones you need and they all share the same data. There is a free edition (Community), installed on your own server, and a per-user paid edition (Enterprise), with more apps, full accounting and updates included.

**3. SAP.** The standard for large companies and many multinationals. Very powerful and highly configurable, but implementation is long and expensive, and it needs specialists to maintain it. It makes sense when the company is large or when the parent company requires it. If you already run SAP, the usual move is not to replace it but to extend it: ABAP developments, reports, Fiori screens or connecting it to other applications.

For most companies in Equatorial Guinea moving on from Excel, the sensible choice is Odoo.

## What to look at in Equatorial Guinea

- **SYSCOHADA accounting.** Odoo includes the official localisation for Equatorial Guinea, with the SYSCOHADA chart of accounts. Even so, it should be reviewed with your accountant or auditor before you file any returns.
- **Currencies.** The CFA franc as the main currency, the euro at its fixed parity (1 euro = 655.957 FCFA) and the dollar at its exchange rate. A good ERP converts each invoice automatically.
- **Imports.** In a country that imports almost everything, the system has to add freight, customs and transport to the cost of each product. Otherwise you calculate your margins on a price that isn’t the real one.
- **Several warehouses.** Malabo and Bata at least, with transfers between them and stock per warehouse.
- **Connectivity and power.** The cloud version needs internet. If your connection often drops, it can be installed on a server inside the office, with a UPS or generator and backups kept off-site.
- **Payroll.** Odoo does not yet include ready-made payroll for Equatorial Guinea. It can be set up as a custom configuration, but it is better left for a second phase.
- **Local support.** An ERP is not installed and forgotten: there will be questions, adjustments and new staff to train. Having whoever implements it based in Malabo makes a difference.

## How much it costs

An ERP has two separate costs. The first is the **licences**: free with Odoo Community; with Enterprise, a fee per user per month paid directly to Odoo. The second, and the bigger one, is the **implementation**: analysing your processes, configuring the system, moving your data over and training your team.

What moves the implementation price most is the number of companies and departments, the amount and state of the data to migrate, and custom developments. The more you adapt to what the system already offers, the cheaper and easier to maintain it will be.

## How to implement it without failing

1. **Analysis.** Interviews with each department and a map of how you work today.
2. **What the system covers and what it doesn’t.** Before configuring anything, decide what the standard solves, what gets configured and what would need to be developed.
3. **Configuration and migration.** Company, chart of accounts, taxes, warehouses, products, customers and suppliers, opening balances and permissions.
4. **Testing with the people who will use it**, with real cases from their work.
5. **Role-based training:** purchasing, warehouse, sales, accounting and management.
6. **Go-live**, ideally at the start of a month or, if possible, of the financial year.
7. **Support** over the following weeks.

The rule that saves the most projects: **start small**. One company and a few departments, go live, and then add the rest. Trying to bring in every company and every app at once is the number one reason ERPs end up abandoned.

## How we do it at BKLN

We implement Odoo with Equatorial Guinea’s accounting, and we develop and integrate SAP for companies that already use it. Before we start, we show you [our own Odoo](/portfolio/bkln-en-odoo) running with a demo company: imported purchases at their real cost, warehouses in Malabo and Bata, sales, invoices and projects with hours.

If you want to know which option suits you, [tell us how you work today](/servicios/erp-odoo-sap) and we’ll tell you frankly, even if the answer is that Excel is still enough for now.`,
  author: {
    name: 'BKLN Software',
    avatar: '',
    bio: 'The BKLN Software & Systems development team.',
  },
  tags: ['ERP', 'Odoo', 'SAP', 'SYSCOHADA accounting', 'Equatorial Guinea'],
}
