import products from './products.json';

export async function GET(request) {
  return NextResponse.json(products);
}
