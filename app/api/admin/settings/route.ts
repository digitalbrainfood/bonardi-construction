import { NextRequest, NextResponse } from "next/server";

// TODO: Connect to Supabase when ready
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

const defaultBonardiSettings = {
  companyName: "Bonardi Construction",
  phone: "(718) 507-6543",
  fax: "(718) 507-6544",
  email: "info@bonardiconstruction.com",
  address: "Queens, NY",
  facebook: "https://www.facebook.com/BonardiConstruction",
  instagram: "https://www.instagram.com/bonardiconstruction",
  hoursWeekday: "Mon-Fri: 7:00 AM - 6:00 PM",
  hoursSaturday: "Sat: 8:00 AM - 2:00 PM",
  hoursSunday: "Sun: Closed",
  licenseNYC: "LIC# 2049498-DCA",
  licenseNassau: "LIC# H1809170000",
  licenseSuffolk: "LIC# 54109-H",
  defaultMetaTitle:
    "Bonardi Construction | NYC & Long Island General Contractor",
  defaultMetaDescription:
    "Over 60 years of construction excellence. Bonardi Construction provides asphalt paving, concrete, roofing, masonry, new construction, and restoration services across NYC, Nassau & Suffolk County.",
  ogImage: "/images/bonardi-og.jpg",
};

// GET - Get site settings
export async function GET() {
  try {
    // TODO: Fetch from Supabase
    // const { data, error } = await supabase
    //   .from('site_settings')
    //   .select('*')
    //   .eq('id', 'main')
    //   .single();
    // if (error && error.code !== 'PGRST116') throw error;
    // return NextResponse.json(data || { id: 'main', data: {} });

    return NextResponse.json({
      id: "main",
      data: defaultBonardiSettings,
    });
  } catch (error: unknown) {
    console.error("Fetch settings error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST - Save site settings
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: Upsert into Supabase
    // const { data, error } = await supabase
    //   .from('site_settings')
    //   .upsert({
    //     id: 'main',
    //     data: body,
    //     updated_at: new Date().toISOString(),
    //   }, {
    //     onConflict: 'id',
    //   })
    //   .select()
    //   .single();
    // if (error) throw error;
    // return NextResponse.json(data);

    return NextResponse.json({
      id: "main",
      data: body,
      updated_at: new Date().toISOString(),
      success: true,
    });
  } catch (error: unknown) {
    console.error("Save settings error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to save settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
