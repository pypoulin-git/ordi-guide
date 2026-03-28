import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const catPath = path.join(process.cwd(), 'data', 'catalogue.json')
    const raw = await fs.readFile(catPath, 'utf-8')
    const catalogue = JSON.parse(raw)
    const products = catalogue.products ?? []

    return NextResponse.json(
      { products },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch {
    return NextResponse.json({ products: [] }, { status: 200 })
  }
}
