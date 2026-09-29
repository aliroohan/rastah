export interface ILesson {
  id: string;
  lessonNumber: number;
  title: string;
  duration: string;
  videoHlsUrl: string;
  cloudinaryPublicId?: string;
  summary: string;
  resources?: { title: string; url: string }[];
}

export interface IModule {
  moduleNumber: number;
  title: string;
  lessons: ILesson[];
}

export interface ICourse {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  modules: IModule[];
}

// Built-in Seed Data for Rastah E-Commerce Masterclass
export const DEFAULT_COURSE: ICourse = {
  id: "rastah-ecommerce-101",
  slug: "ecommerce-business-masterclass",
  title: "Rastah E-Commerce Business Masterclass - Zero to 7 Figures",
  description: "Complete practical blueprint for building, launching, and scaling an e-commerce brand in Pakistan.",
  price: 2000,
  modules: [
    {
      moduleNumber: 1,
      title: "Module 1: E-Commerce Foundations & Business Mindset",
      lessons: [
        {
          id: "m1-l1",
          lessonNumber: 1,
          title: "Introduction to Local E-Commerce & COD Realities in Pakistan",
          duration: "14:20",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Overview of the e-commerce landscape in Pakistan, cash flow dynamics, and setting realistic profit targets.",
          resources: [
            { title: "E-Com Budget & Cash Flow Planner (.xlsx)", url: "#" },
            { title: "Niche Selection Matrix (.pdf)", url: "#" },
          ],
        },
        {
          id: "m1-l2",
          lessonNumber: 2,
          title: "White Label vs Dropshipping: Choosing Your Business Model",
          duration: "18:45",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Comparison of direct local inventory vs private supplier dropshipping and selecting the right starting model.",
        },
        {
          id: "m1-l3",
          lessonNumber: 3,
          title: "Essential Tools, Business Setup & Initial Capital Planning",
          duration: "16:10",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Step-by-step guidance on bank accounts, SIM cards, business emails, and tools needed for scale.",
        },
      ],
    },
    {
      moduleNumber: 2,
      title: "Module 2: High-Margin Winning Product Hunting",
      lessons: [
        {
          id: "m2-l1",
          lessonNumber: 4,
          title: "The 5 Criteria of a Winning Product in Pakistan",
          duration: "21:30",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "How to filter products with 60%+ profit margins, low breakage risk, and viral impulse appeal.",
          resources: [
            { title: "Product Validation Checklist (.pdf)", url: "#" },
          ],
        },
        {
          id: "m2-l2",
          lessonNumber: 5,
          title: "Competitor Ad Spying Using Meta Ad Library & TikTok Creative Center",
          duration: "24:15",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Live demonstration of reverse-engineering top-performing competitor ads and landing pages.",
        },
        {
          id: "m2-l3",
          lessonNumber: 6,
          title: "Calculating True Unit Economics (COGS, Shipping, Ads & Returns)",
          duration: "19:50",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Accurate margin calculation spreadsheet to ensure profitability after accounting for courier and return fees.",
        },
      ],
    },
    {
      moduleNumber: 3,
      title: "Module 3: Local Sourcing & Courier Logistics",
      lessons: [
        {
          id: "m3-l1",
          lessonNumber: 7,
          title: "Wholesale Markets Guide: Shah Alam, Bolton Market & Raja Bazar",
          duration: "26:40",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "How to visit, talk to wholesalers, negotiate lowest bulk prices, and inspect samples.",
          resources: [
            { title: "Verified Pakistani Wholesale Directory (.pdf)", url: "#" },
          ],
        },
        {
          id: "m3-l2",
          lessonNumber: 8,
          title: "Opening Corporate COD Accounts with Trax, TCS & Leopards",
          duration: "22:15",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Documentation required, portal navigation, negotiating shipping rates, and remittance schedules.",
        },
        {
          id: "m3-l3",
          lessonNumber: 9,
          title: "Packaging, Quality Check & Fast Order Dispatch Protocol",
          duration: "17:35",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Branded flyer packaging, thermal label printing, and ensuring orders dispatch within 24 hours.",
        },
      ],
    },
    {
      moduleNumber: 4,
      title: "Module 4: High-Converting Shopify Store Creation",
      lessons: [
        {
          id: "m4-l1",
          lessonNumber: 10,
          title: "Setting Up Shopify & Custom Domain in 30 Minutes",
          duration: "28:10",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Clean store setup, currency settings in PKR, and connecting custom .pk/.com domains.",
        },
        {
          id: "m4-l2",
          lessonNumber: 11,
          title: "High-Converting Product Page Architecture (Urdu + English Copy)",
          duration: "32:00",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Structure that converts cold visitors: persuasive hooks, benefit bullet points, GIFs, and reviews.",
          resources: [
            { title: "Ready-to-Use Shopify Theme File (.zip)", url: "#" },
            { title: "Persuasive Urdu Copywriting Swipe File (.docx)", url: "#" },
          ],
        },
        {
          id: "m4-l3",
          lessonNumber: 12,
          title: "Integrating 1-Click Cash on Delivery Checkout Form",
          duration: "18:25",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Eliminating friction by replacing multi-step checkouts with single-click address and WhatsApp confirmation.",
        },
      ],
    },
    {
      moduleNumber: 5,
      title: "Module 5: Meta & TikTok Paid Advertising Blueprint",
      lessons: [
        {
          id: "m5-l1",
          lessonNumber: 13,
          title: "Facebook Business Manager, Pixel & Conversion API Setup",
          duration: "25:40",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Correct tracking setup, domain verification, and event configuration for accurate purchase reporting.",
        },
        {
          id: "m5-l2",
          lessonNumber: 14,
          title: "Filming Winning UGC Video Creatives with Your Smartphone",
          duration: "29:50",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "The 3-second hook formula, problem-solution storytelling, and call to action that drops cost per order.",
        },
        {
          id: "m5-l3",
          lessonNumber: 15,
          title: "Campaign Structure: Testing with Rs. 1,000/day Budget",
          duration: "34:10",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "ABO testing setup, audience interests vs broad targeting in Pakistan, and reading key ad metrics.",
        },
        {
          id: "m5-l4",
          lessonNumber: 16,
          title: "Scaling Profitable Campaigns to 100+ Orders a Day",
          duration: "27:15",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "CBO scaling, horizontal scaling with new creatives, and maintaining high ROAS without fatigue.",
        },
      ],
    },
    {
      moduleNumber: 6,
      title: "Module 6: Returns (RTO) Control, Customer Support & Scaling",
      lessons: [
        {
          id: "m6-l1",
          lessonNumber: 17,
          title: "Automated WhatsApp Confirmation to Cut Returns Below 10%",
          duration: "22:30",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Order verification workflows that filter out fake or accidental orders before dispatching.",
        },
        {
          id: "m6-l2",
          lessonNumber: 18,
          title: "Resolving Courier Delivery Issues & Managing Undelivered Parcels",
          duration: "20:45",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Daily tracking sheet review, communicating with courier helpline, and re-attempting deliveries.",
        },
        {
          id: "m6-l3",
          lessonNumber: 19,
          title: "Hiring Virtual Assistants, Managing Cash Flow & Next Steps",
          duration: "24:00",
          videoHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          summary: "Reinvesting profits, delegating customer support, and building long-term sustainable brand equity.",
        },
      ],
    },
  ],
};
