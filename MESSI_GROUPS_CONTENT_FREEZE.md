# Messi Groups service content freeze

Status: Phase 1 public service catalogue freeze. Content is centralized in `app/lib/services.ts` and should be treated as the source of truth until a CMS or operations database is connected.

## Editorial rules

- The public website is enquiry-first. It does not offer checkout, customer login, direct payment processing, Amazon API automation, marketplace automation, or a customer dashboard.
- `PRICE_TO_BE_CONFIRMED` is used when pricing has not been supplied. Current priority service packages use quote-only mode and do not invent prices.
- No service promises guaranteed reinstatement, recovery, valuation, processing time, profit, or any other outcome.
- Sensitive account identifiers, screenshots, appeals, business documents, and other uploads must be moved to private object storage before production launch. They must not be written to `public/`.
- `NEXT_PUBLIC_SITE_URL` must be set to the approved canonical domain before launch. The code fallback is `https://messigroups.com` and is a deployment placeholder, not a confirmed client domain.

## Frozen priority service records

Each record supports the following fields: service name, URL slug, parent category, short description, full description, target customer, customer problem, main outcome, benefits, process, requirements, required documents, packages, pricing mode, FAQs, CTA labels, WhatsApp message, disclaimer, SEO title, SEO description, Open Graph image, canonical URL, display order, featured status, active/inactive status, published/hidden status, and archived status.

### 1. Account Liquidation and Inventory Services

- ID: `account-liquidation`
- Slug: `/services/account-liquidation`
- Parent category: `Inventory Liquidation`
- Short description: Review, organize, value, and plan a practical route for Amazon-related inventory or other stock.
- Full description: Messi Groups helps sellers and businesses understand available inventory, organize information into workable lots, and assess liquidation routes. The final route, valuation, and quotation depend on the inventory details and operational review completed after enquiry.
- Target customer: Amazon sellers, brands, distributors, and businesses holding stock that needs a clearer commercial route.
- Customer problem: Slow-moving, stranded, excess, or operationally complicated inventory can tie up cash and make the next decision difficult.
- Main outcome: A structured inventory assessment and a recommended next step based on the details provided.
- Benefits: Inventory overview; product, seller, financial, document, and logistics review; assessed liquidation options; structured future case and quotation workflow.
- Process: Submit inventory details; upload supporting information; Messi Groups reviews the inventory; organize lots where required; assess value and options; share a recommended route; confirm the next step; move into execution.
- Requirements: Inventory overview; preferred route and constraints; accurate contact and location details.
- Required documents: Inventory spreadsheets; product images and documents; Amazon or seller information where applicable; financial documents if required; logistics information where relevant.
- Packages: `Liquidation assessment` — quote only.
- Pricing mode: `quote_only`.
- Pricing: `PRICE_TO_BE_CONFIRMED`.
- FAQs: Whether all inventory is accepted; whether an incomplete spreadsheet is okay; whether valuation is guaranteed.
- CTA label: `Request a liquidation assessment`.
- WhatsApp message: `Hello Messi Groups, I would like to request an inventory liquidation assessment.`
- Disclaimer: Liquidation routes, valuation, and quotations are subject to inventory details, condition, location, and operational review. No outcome or price is guaranteed before assessment.
- SEO title: `Account Liquidation & Inventory Services | Messi Groups`.
- SEO description: `Get a structured review of Amazon-related inventory or other stock, with liquidation routes assessed around your details.`
- Open Graph image: `/hero-operations.png`.
- Canonical URL: `/services/account-liquidation` until `NEXT_PUBLIC_SITE_URL` is confirmed.
- Display order: `1`.
- Featured: `true`.
- Active: `true`.
- Published: `true`.
- Archived: `false`.

Operational fields represented in the enquiry structure: seller information, product information, Amazon information, financial information, document review, logistics information, inventory lot context, and preferred route. Future operations fields to add at the database layer: automatic liquidation tracking ID, lot editing, valuation and expected-profit calculations, assignment, approvals, notifications, reminders, quotation records, and customer decision records.

### 2. Account Deactivation & Reinstatement Support

- ID: `amazon-account-recovery`
- Slug: `/services/account-deactivation-reinstatement`
- Parent category: `Account Deactivation & Reinstatement Support`
- Short description: Confidential review, appeal preparation, and recovery guidance for Amazon account issues.
- Full description: Messi Groups provides structured support for review, appeal preparation, and recovery guidance based on the notice, account history, and available evidence. It does not promise a guaranteed outcome.
- Target customer: Amazon sellers, operators, and businesses dealing with deactivation notices, account-health issues, or a stalled appeal.
- Customer problem: Notices can be unclear, previous appeals may not address the underlying concern, and sensitive evidence can be difficult to organize.
- Main outcome: A confidential assessment and clearer evidence-led next step.
- Benefits: Initial case review; evidence organization; appeal preparation support; private, service-specific enquiry path.
- Process: Share the account situation; provide relevant evidence; initial case review; prepare a response strategy; track progress.
- Requirements: Deactivation notice; issue description; previous attempts; accurate contact details.
- Required documents: Notification screenshots; previous appeals and dates; previous Amazon responses; relevant account and business documents; other supporting evidence.
- Packages: `Confidential account review` — quote only.
- Pricing mode: `quote_only`.
- Pricing: `PRICE_TO_BE_CONFIRMED`.
- FAQs: Whether reinstatement is guaranteed; whether screenshots and appeals can be shared; never sharing passwords.
- CTA label: `Request a confidential review`.
- WhatsApp message: `Hello Messi Groups, I would like to request a confidential Amazon account review.`
- Disclaimer: Messi Groups provides support, review, assessment, appeal preparation, and recovery guidance. No reinstatement, recovery, timeline, or outcome is guaranteed.
- SEO title: `Account Deactivation & Reinstatement Support | Messi Groups`.
- SEO description: `Confidential account review, appeal preparation, and recovery guidance based on your notice and available evidence.`
- Open Graph image: `/hero-operations.png`.
- Canonical URL: `/services/account-deactivation-reinstatement` until `NEXT_PUBLIC_SITE_URL` is confirmed.
- Display order: `2`.
- Featured: `true`.
- Active: `true`.
- Published: `true`.
- Archived: `false`.

Operational stages represented for the future app: initial review, document requests, missing-information follow-up, strategy preparation, appeal/recovery progress, staff notes, customer communication, progress updates, final outcome, completed, rejected, cancelled, and on-hold cases. Sensitive files require private object storage, file validation, signed URLs, permission-based access, restricted staff visibility, audit logs, and secure deletion/retention policies.

### 3. Boost Business & Scaling Solutions

- ID: `boost-business-scaling`
- Slug: `/services/boost-business-scaling`
- Parent category: `Boost Business & Scaling Solutions`
- Short description: Configurable support for Amazon operations, agencies, consultants, and client delivery.
- Full description: A guided business review for operators who want a clearer path forward. Explore practical support options including Amazon and white-label virtual assistant services, sourcing, operations, and business support.
- Target customer: Founders, Amazon sellers, agencies, consultants, and growing businesses that need a clearer operating plan.
- Customer problem: Growth can stall when priorities are unclear, processes are scattered, or the right support is difficult to scope.
- Main outcome: A focused review that identifies a practical starting point without promising a specific business result.
- Benefits: Bottleneck review; focused next-step plan; optional Amazon and white-label virtual assistant support; short enquiry path.
- Process: Choose the bottleneck; complete the guided diagnostic; review the roadmap; choose a service option; start a focused enquiry.
- Requirements: Current challenge; business stage; first support need; desired scope and contact details.
- Required documents: Task lists or SOPs; white-label brand guidelines where relevant; reporting examples; access and confidentiality requirements.
- Packages shown publicly: `Basic`, `Standard`, and `Premium`. `Full Management` and `Custom` remain inactive configuration records until their content is confirmed.
- Pricing mode: `quote_only` for every package.
- Pricing: `PRICE_TO_BE_CONFIRMED` for every package.
- Package fields: Included tasks, excluded tasks, configurable support-area tooltips, working hours, team size, response expectations, reporting frequency, tools, onboarding requirements, recommended flag, display order, and active status are configurable in the data model. No prices or fixed inclusions are invented.
- FAQs: Amazon VA versus white-label VA; whether every listed Amazon task is included; why package prices are not published yet.
- CTA label: `Find My Growth Bottleneck`.
- WhatsApp message: `Hello Messi Groups, I would like to discuss a business growth review.`
- Disclaimer: Support scope, included tasks, staffing, response expectations, and pricing are subject to confirmation after the business situation is reviewed. No business result is guaranteed.
- SEO title: `Boost Business & Scaling Solutions | Messi Groups`.
- SEO description: `Identify the biggest growth bottleneck and find a practical next step across systems, sourcing, e-commerce, and business support.`
- Open Graph image: `/hero-operations.png`.
- Canonical URL: `/services/boost-business-scaling` until `NEXT_PUBLIC_SITE_URL` is confirmed.
- Display order: `3`.
- Featured: `true`.
- Active: `true`.
- Published: `true`.
- Archived: `false`.

## Current service-area mapping

The requested homepage service order is:

1. Account Liquidation → `account-liquidation`
2. Account Deactivation & Reinstatement Support → `account-deactivation-reinstatement`
3. Virtual Assistant (Amazon & White Label) → `boost-business-scaling`
4. Course → catalogue category only; detail content pending client confirmation
5. LLC Creation → catalogue category only; detail content pending client confirmation
6. US Physical Bank Account → catalogue category only; detail content pending client confirmation
7. Sourcing → catalogue category only; detail content pending client confirmation
8. 3PL Service (Warehouse Required for Inventory) → catalogue category only; detail content pending client confirmation
9. Shipment from Pakistan (Within 7 Days) → catalogue category only; detail content pending client confirmation

## Pending client decisions

- Confirm the production canonical domain and set `NEXT_PUBLIC_SITE_URL`.
- Confirm prices, currencies, package inclusions, hours, team sizes, response expectations, tools, and onboarding details.
- Confirm the production enquiry destination and operations-platform integration.
- Approve private file storage, retention, deletion, staff roles, audit logging, and rate limiting for sensitive uploads.
- Confirm the exact operational wording and any legal/compliance review required for account support and inventory valuation.
