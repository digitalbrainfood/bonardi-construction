import { NextRequest, NextResponse } from 'next/server';

// TODO: Uncomment when ANTHROPIC_API_KEY is provided
// import Anthropic from '@anthropic-ai/sdk';
// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

export async function POST(request: NextRequest) {
  try {
    const { serviceName, template = 'service' } = await request.json();

    if (!serviceName) {
      return NextResponse.json(
        { error: 'Service name is required' },
        { status: 400 }
      );
    }

    // Full prompt template for when Claude API is connected:
    // const prompt = `You are a professional copywriter for Bonardi Construction, Inc., a family-owned construction company serving Queens, Brooklyn, Nassau County, and Long Island, New York. The company is led by owner Gary M. Bonelli and specializes in construction, masonry, roofing, asphalt paving, concrete work, home additions, restoration, and more. Phone: 718.762.3400.
    //
    // Generate a complete page for: "${serviceName}"
    //
    // Template type: ${template}
    //
    // IMPORTANT - IMAGE SELECTION:
    // You MUST include images from the pool below. Pick the most relevant images for the topic. Use different images for different fields when possible.
    //
    // Image pool (use EXACTLY these URLs, do not modify them):
    // - HERO_CONSTRUCTION: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070" (construction/workers)
    // - HERO_HOUSE: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" (residential house exterior)
    // - MASONRY: "https://images.unsplash.com/photo-1587582423116-ec07293f0395?q=80&w=2070" (masonry/brickwork)
    // - MODERN_HOUSE: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070" (modern home)
    // - COMMERCIAL: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" (commercial building)
    // - ASPHALT: "https://images.unsplash.com/photo-1558618666-fcd25c85f7e7?q=80&w=2070" (asphalt/paving)
    // - HOME_FRONT: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070" (home front view)
    // - ROOFING: "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=2070" (roofing work)
    // - FOUNDATION: "https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?q=80&w=2070" (foundation/structural)
    // - TEAM: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070" (construction team)
    // - HARDSCAPING: "https://images.unsplash.com/photo-1600596542815-611643e8bab4?q=80&w=2070" (hardscaping/outdoor)
    // - NEW_BUILD: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070" (new construction site)
    // - INTERIOR: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070" (home interior)
    //
    // Return ONLY valid JSON (no markdown, no explanation) in this exact structure:
    //
    // {
    //   "hero": {
    //     "title": "Main headline for the page",
    //     "titleHighlight": "Key phrase to highlight (2-3 words)",
    //     "description": "Compelling description (2-3 sentences)",
    //     "primaryButtonText": "CTA button text",
    //     "primaryButtonLink": "/contact",
    //     "backgroundImage": "PICK_MOST_RELEVANT_URL_FROM_POOL_FOR_HERO"
    //   },
    //   "intro": {
    //     "heading": "Introduction section heading",
    //     "content": "Detailed introduction paragraph about this service (3-4 sentences)"
    //   },
    //   "services": [
    //     {
    //       "title": "Service feature 1",
    //       "description": "Description of this feature",
    //       "icon": "Shield",
    //       "image": "PICK_RELEVANT_URL_FROM_POOL"
    //     },
    //     {
    //       "title": "Service feature 2",
    //       "description": "Description of this feature",
    //       "icon": "Award",
    //       "image": "PICK_RELEVANT_URL_FROM_POOL"
    //     },
    //     {
    //       "title": "Service feature 3",
    //       "description": "Description of this feature",
    //       "icon": "Clock",
    //       "image": "PICK_RELEVANT_URL_FROM_POOL"
    //     },
    //     {
    //       "title": "Service feature 4",
    //       "description": "Description of this feature",
    //       "icon": "CheckCircle",
    //       "image": "PICK_RELEVANT_URL_FROM_POOL"
    //     }
    //   ],
    //   "benefits": [
    //     "Benefit 1",
    //     "Benefit 2",
    //     "Benefit 3",
    //     "Benefit 4",
    //     "Benefit 5",
    //     "Benefit 6"
    //   ],
    //   "process": [
    //     { "step": 1, "title": "Step title", "description": "Step description" },
    //     { "step": 2, "title": "Step title", "description": "Step description" },
    //     { "step": 3, "title": "Step title", "description": "Step description" },
    //     { "step": 4, "title": "Step title", "description": "Step description" }
    //   ],
    //   "faq": [
    //     { "question": "Common question 1?", "answer": "Detailed answer" },
    //     { "question": "Common question 2?", "answer": "Detailed answer" },
    //     { "question": "Common question 3?", "answer": "Detailed answer" }
    //   ],
    //   "cta": {
    //     "title": "CTA section heading",
    //     "description": "Compelling call to action description",
    //     "buttonText": "Contact Us Today",
    //     "buttonLink": "/contact"
    //   },
    //   "seo": {
    //     "metaTitle": "Page title | Bonardi Construction (60 chars max)",
    //     "metaDescription": "Meta description for SEO (150-160 chars)",
    //     "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
    //     "ogImage": "PICK_RELEVANT_URL_FROM_POOL_FOR_SOCIAL_SHARING"
    //   }
    // }
    //
    // Requirements:
    // - Focus on Queens, Brooklyn, Nassau County, and Long Island NY service area
    // - Emphasize family-owned, decades of experience, quality craftsmanship
    // - Use professional but approachable tone
    // - Include specific details about the construction industry
    // - Icons must be from: Shield, Award, Clock, CheckCircle, Star, Users, Home, Wrench, Phone, Calendar, DollarSign, Zap, HardHat, Hammer, Building
    // - Make content unique and valuable for SEO
    // - CRITICAL: For ALL image fields, you MUST use actual URLs from the image pool above. Pick the most contextually relevant image for each field. Use variety.`;
    //
    // TODO: Uncomment when ANTHROPIC_API_KEY is provided
    // const message = await anthropic.messages.create({
    //   model: 'claude-sonnet-4-20250514',
    //   max_tokens: 4096,
    //   messages: [{ role: 'user', content: prompt }],
    // });
    // const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    // let pageData;
    // try {
    //   pageData = JSON.parse(responseText);
    // } catch {
    //   const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    //   if (jsonMatch) {
    //     pageData = JSON.parse(jsonMatch[1]);
    //   } else {
    //     throw new Error('Failed to parse AI response as JSON');
    //   }
    // }
    // return NextResponse.json(pageData);

    // STUB: Return hardcoded example page data
    const stubPageData = {
      hero: {
        title: `Professional ${serviceName}`,
        titleHighlight: "in Queens & NYC",
        description: `Bonardi Construction, Inc. provides expert ${serviceName.toLowerCase()} services for residential and commercial properties across Queens, Brooklyn, Nassau County, and Long Island. Trusted craftsmanship backed by decades of experience.`,
        primaryButtonText: "Request an Estimate",
        primaryButtonLink: "/contact",
        backgroundImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
      },
      intro: {
        heading: `Why Choose Bonardi Construction for ${serviceName}`,
        content: `At Bonardi Construction, Inc., we understand that quality ${serviceName.toLowerCase()} requires expert craftsmanship, premium materials, and meticulous attention to detail. Led by owner Gary M. Bonelli, our team brings decades of hands-on experience to every project. We serve homeowners and businesses throughout Queens, Brooklyn, Nassau County, and the greater Long Island area with reliable, code-compliant work that stands the test of time.`,
      },
      services: [
        {
          title: "Expert Assessment",
          description: `Thorough evaluation of your ${serviceName.toLowerCase()} needs with detailed project planning and transparent pricing.`,
          icon: "Shield",
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070",
        },
        {
          title: "Quality Materials",
          description: "We use only premium, industry-leading materials from trusted suppliers to ensure lasting results.",
          icon: "Award",
          image: "https://images.unsplash.com/photo-1587582423116-ec07293f0395?q=80&w=2070",
        },
        {
          title: "Timely Completion",
          description: "Efficient project management ensures your work is completed on schedule without cutting corners.",
          icon: "Clock",
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070",
        },
        {
          title: "Full Compliance",
          description: "All work meets NYC building codes and DOB requirements. Licensed and fully insured for your protection.",
          icon: "CheckCircle",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
        },
      ],
      benefits: [
        "Decades of construction experience in NYC",
        "Licensed, bonded, and fully insured",
        "Transparent pricing with no hidden fees",
        "NYC DOB compliant on all projects",
        "Family-owned and community-focused",
        "Serving Queens, Brooklyn, Nassau County & Long Island",
      ],
      process: [
        {
          step: 1,
          title: "Consultation & Assessment",
          description: "We visit your property, assess the scope of work, discuss your goals, and provide a detailed written estimate.",
        },
        {
          step: 2,
          title: "Planning & Permits",
          description: "Our team handles all project planning, material selection, and any required permits or DOB filings.",
        },
        {
          step: 3,
          title: "Construction & Execution",
          description: "Skilled crews execute the work with precision, keeping you informed at every stage of the project.",
        },
        {
          step: 4,
          title: "Final Inspection & Walkthrough",
          description: "We conduct a thorough final inspection and walkthrough to ensure everything meets our high standards and your expectations.",
        },
      ],
      faq: [
        {
          question: `How long does a typical ${serviceName.toLowerCase()} project take?`,
          answer: "Project timelines vary based on scope and complexity. During your consultation, we provide a detailed timeline so you know exactly what to expect. Most projects are completed within the estimated timeframe.",
        },
        {
          question: "Do you handle permits and inspections?",
          answer: "Yes. Bonardi Construction handles all necessary NYC DOB permits, filings, and inspections. We ensure every project is fully compliant with local building codes and regulations.",
        },
        {
          question: "What areas do you serve?",
          answer: "We serve Queens, Brooklyn, Nassau County, and Long Island. Whether your project is residential or commercial, our experienced team is ready to help throughout the greater NYC metro area.",
        },
      ],
      cta: {
        title: "Ready to Start Your Project?",
        description: `Contact Bonardi Construction today to discuss your ${serviceName.toLowerCase()} needs. Call us at 718.762.3400 or fill out our contact form for a prompt response.`,
        buttonText: "Contact Us Today",
        buttonLink: "/contact",
      },
      seo: {
        metaTitle: `${serviceName} | Bonardi Construction - Queens, NY`,
        metaDescription: `Expert ${serviceName.toLowerCase()} services in Queens, Brooklyn, Nassau County & Long Island. Bonardi Construction delivers quality craftsmanship backed by decades of experience. Call 718.762.3400.`,
        keywords: [
          serviceName.toLowerCase(),
          `${serviceName.toLowerCase()} queens ny`,
          "bonardi construction",
          "construction company queens",
          `${serviceName.toLowerCase()} contractor nyc`,
        ],
        ogImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
      },
    };

    return NextResponse.json(stubPageData);
  } catch (error: unknown) {
    console.error('Generate page error:', error);
    const message = error instanceof Error ? error.message : (error as { message?: string })?.message || 'Failed to generate page';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
