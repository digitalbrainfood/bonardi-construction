import { NextRequest, NextResponse } from 'next/server';

// TODO: Uncomment when ANTHROPIC_API_KEY is provided
// import Anthropic from '@anthropic-ai/sdk';
// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

export async function POST(request: NextRequest) {
  try {
    const { topic, keywords = [] } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Blog topic is required' },
        { status: 400 }
      );
    }

    // Full prompt template for when Claude API is connected:
    // const keywordStr = keywords.length > 0
    //   ? `Focus on these keywords: ${keywords.join(', ')}`
    //   : '';
    //
    // const prompt = `You are a professional content writer for Bonardi Construction, Inc., a family-owned construction company serving Queens, Brooklyn, Nassau County, and Long Island, New York. The company is led by owner Gary M. Bonelli and specializes in construction, masonry, roofing, asphalt paving, concrete, home additions, restoration, and more. Phone: 718.762.3400.
    //
    // Write a comprehensive blog post about: "${topic}"
    //
    // ${keywordStr}
    //
    // IMPORTANT - IMAGE SELECTION:
    // You MUST include a featured_image from the pool below. Pick the most relevant image for the blog topic.
    //
    // Image pool (use EXACTLY these URLs, do not modify them):
    // - "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200" (construction/workers)
    // - "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" (residential house exterior)
    // - "https://images.unsplash.com/photo-1587582423116-ec07293f0395?q=80&w=1200" (masonry/brickwork)
    // - "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200" (modern home)
    // - "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200" (commercial building)
    // - "https://images.unsplash.com/photo-1558618666-fcd25c85f7e7?q=80&w=1200" (asphalt/paving)
    // - "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200" (home front view)
    // - "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=1200" (roofing work)
    // - "https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?q=80&w=1200" (foundation/structural)
    // - "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200" (construction team)
    // - "https://images.unsplash.com/photo-1600596542815-611643e8bab4?q=80&w=1200" (hardscaping/outdoor)
    // - "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200" (new construction site)
    // - "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200" (home interior)
    //
    // Return ONLY valid JSON (no markdown, no explanation) in this exact structure:
    //
    // {
    //   "title": "Engaging blog post title",
    //   "slug": "url-friendly-slug",
    //   "excerpt": "Compelling 2-3 sentence summary for previews",
    //   "featured_image": "PICK_MOST_RELEVANT_URL_FROM_POOL",
    //   "content": "<article HTML content here - 1000-1500 words with proper headings, paragraphs, lists>",
    //   "category": "One of: Construction Tips, Masonry & Concrete, Home Improvement, Seasonal Advice, Industry News",
    //   "tags": ["tag1", "tag2", "tag3", "tag4"],
    //   "seo": {
    //     "metaTitle": "SEO title (60 chars max)",
    //     "metaDescription": "Meta description (150-160 chars)",
    //     "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
    //   }
    // }
    //
    // HTML Content Requirements:
    // - Use semantic HTML: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
    // - Include 3-5 subheadings with <h2> tags
    // - Use bullet points or numbered lists where appropriate
    // - Write 1000-1500 words of valuable, informative content
    // - Include a brief conclusion
    // - Make content specific to Queens/Long Island NY area where relevant
    // - Do NOT use <h1> (that's the title)
    //
    // Content Guidelines:
    // - Professional but approachable tone
    // - Provide actionable advice
    // - Include industry expertise and local knowledge
    // - Reference the company's decades of experience where appropriate
    // - Focus on educating property owners`;
    //
    // TODO: Uncomment when ANTHROPIC_API_KEY is provided
    // const message = await anthropic.messages.create({
    //   model: 'claude-sonnet-4-20250514',
    //   max_tokens: 4096,
    //   messages: [{ role: 'user', content: prompt }],
    // });
    // const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    // let blogData;
    // try {
    //   blogData = JSON.parse(responseText);
    // } catch {
    //   const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    //   if (jsonMatch) {
    //     blogData = JSON.parse(jsonMatch[1]);
    //   } else {
    //     throw new Error('Failed to parse AI response as JSON');
    //   }
    // }
    // return NextResponse.json(blogData);

    // STUB: Return hardcoded example blog data
    const slugify = (text: string) =>
      text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const stubBlogData = {
      title: `Essential Guide to ${topic}`,
      slug: slugify(topic),
      excerpt: `Learn everything you need to know about ${topic.toLowerCase()} from the experts at Bonardi Construction. Our team shares decades of experience to help you make informed decisions about your property.`,
      featured_image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200",
      content: `
        <h2>Understanding ${topic}</h2>
        <p>When it comes to ${topic.toLowerCase()}, having the right knowledge and working with experienced professionals can make all the difference. At Bonardi Construction, Inc., we've been serving homeowners and businesses across Queens, Brooklyn, Nassau County, and Long Island for decades, and we've seen firsthand how proper planning and quality workmanship lead to lasting results.</p>

        <h2>Key Considerations</h2>
        <p>Before starting any project related to ${topic.toLowerCase()}, there are several important factors to consider:</p>
        <ul>
          <li><strong>Local building codes:</strong> NYC has specific requirements that must be met for all construction work. Our team handles all DOB permits and compliance.</li>
          <li><strong>Material selection:</strong> Choosing the right materials for your specific project ensures durability and long-term value.</li>
          <li><strong>Timeline planning:</strong> Understanding the scope of work helps set realistic expectations for project completion.</li>
          <li><strong>Budget considerations:</strong> Getting a detailed estimate upfront prevents surprises down the road.</li>
        </ul>

        <h2>Why Professional Service Matters</h2>
        <p>While some homeowners may consider DIY approaches, professional ${topic.toLowerCase()} work ensures that the job is done correctly the first time. Improper work can lead to costly repairs, safety hazards, and potential code violations that affect your property value.</p>
        <p>At Bonardi Construction, our licensed and insured team brings the expertise needed to handle projects of any size. From initial consultation through final inspection, we maintain the highest standards of quality and professionalism.</p>

        <h2>Our Approach</h2>
        <p>Every project at Bonardi Construction follows a proven process:</p>
        <ul>
          <li>Thorough property assessment and consultation</li>
          <li>Detailed written estimate with transparent pricing</li>
          <li>Expert execution by skilled tradespeople</li>
          <li>Quality control inspections throughout the project</li>
          <li>Final walkthrough and client satisfaction guarantee</li>
        </ul>

        <h2>Get Started Today</h2>
        <p>Whether you're planning a new project or need expert advice about ${topic.toLowerCase()}, Bonardi Construction is here to help. Contact us at 718.762.3400 to schedule a consultation with our team. We look forward to bringing our expertise to your next project.</p>
      `,
      category: "Construction Tips",
      tags: [
        topic.toLowerCase(),
        "construction",
        "queens ny",
        "home improvement",
      ],
      seo: {
        metaTitle: `${topic} Guide | Bonardi Construction - Queens, NY`,
        metaDescription: `Expert guide to ${topic.toLowerCase()} from Bonardi Construction. Serving Queens, Brooklyn, Nassau County & Long Island. Call 718.762.3400 for a consultation.`,
        keywords: [
          topic.toLowerCase(),
          "bonardi construction",
          "queens construction",
          "nyc contractor",
          ...(keywords.length > 0 ? keywords : []),
        ],
      },
    };

    return NextResponse.json(stubBlogData);
  } catch (error: unknown) {
    console.error('Generate blog error:', error);
    const message = error instanceof Error ? error.message : (error as { message?: string })?.message || 'Failed to generate blog post';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
