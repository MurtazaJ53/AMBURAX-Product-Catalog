export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export type Product = {
  id: string;
  name: string;
  sku: string;
  brand: string;
  category: string;
  price: number;
  mrp: number;
  stock: number;
  status: StockStatus;
  color: string;
  colorHex: string;
  sizes: string[];
  image: string;
  description: string;
  material: string;
  updated: string;
};

const stitchImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAErco-SVxnzokWHk8q0ry9okNA51lEMPyHrOChnRPBc2Pe6U3Y4TNfpHaZBPdT9_ICMUN0lq4UsDGuGqKhh4rzymtQOlzvIaQSRsh_xrQ0hqjNPBaRc1IS5O9Oy_VvCRYba1N83JsBvVgBdvLIuu15NqDNmdmlUpptu4cRN4Ucm4EVfIrjMssqTO8oRzjLrOsuZ72-uHKqRb9L3lFNBK76xQ540a9cnZHmQFMbVuhELDPf9wTkAua-',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCyY7t8lQDjLMW-YbIfxXURQYVS_fFE5TePs6qmYNqtwxuf3k3TQKlvqvYct9Ww2IkBV5hZH7j4mxQbCdQDkP-uTTKCCou7OJCR8FgWaktPVHsRWxJBn9yvxbJEdNLJGeF_HtI4f_xmR4MCMwqZJ7HZhjYaUbpKGgV5PycKc4bscBJoEaY5zjZ9_KfbqfHSP0z2_BLihm5l_2XR9vRLc8eKXnjkTc9O5DJRIuw6Mv6zhlt2Sf6LXjlW',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDHSON8zGpO9VDypB0FpvSl1EbMcB7Zx12aQHvl1HjKspg7M69U7AuyHSlwH--a6V83486ku-0Dtas6aeWnki3MLVIqJZ424ZztxaDb-37Ztbyr4iHjHNFuJ8zHYJIIdQbYF9ighghkacWPd5b6haI75vc_L70WmCAi-HJnjrfWVDb9bR7_pqD7_cGUeBi1dtfAILdwnkj5mBGFCpUfCMg5KK9QSPmMGEgPlticmaLBDc29edLXC7id',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAoDISwjAP5KsCgpxs3K7nQLDPn0pH7R3p1ZfFby9BXLfvIePBhBpn13q-H4F4Nwld46s-vyyrhjxAGQUf8VlVKO4WOQ-HpbjqchPSakVWD_2UoI_rZCTlZRS-T2bysL6jrZ9Sh9-ja5s3zZZGuROxyqmfABI6-wx1WM-AiD6Lu9y2o0LxLf-JLaLCYABzyo7R_eKBmiD-QOy7vRNEpCd0WmFP08UIDFssWeaI9cAlFEdmioHgMPtH3',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCncYBl4M4BbyNEd_GMciyetp7dCuuB8E7Y19q8qr1MmOH_BXTsywXYYmsnnhBTOJICxKbJotxPJi2RwkXeWHXRyzesiXnnwpl-Da2bBMON7skSf4lBuiahwDtLI1CkhkTy0RtCQrIXOVDAXh0AUQu-uEjFQfPexqW6fYNx04gyCu1SEWr89kFUqradOe6SLhTn836CCm7LEF_fkyTmP6ILaNsLcIRxSU3zfV838mZ_GqPqMFvOVEey',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBCC03Y5hBC9MWbzC9bsTEykLc_Fq2n9YRcUi4fo1X_wlv9cjSwYyVFIoY7kJGapk2ol_BpAjkH86650_7SzI48fRUzjoDo_fRyt8bPnOlX4IwmOC2HfXgPzbaGqguLUL5cgGjsh6huNs4OATPeXgIdYiUNF5KajIXjtp1TBWKZdTxfYMlwET9NPBaIzpkvxaywYhLLLvJlUZdohUXXbicoy2KWWXqyOGnwoL0N6j8gHvgXGYL_pc7z',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNZ0m-SCrni5sqbNEX9Qo6n58Fk6G3s_rQD8AB2YY0WuWij577yfkmuQAn5PK3NY16DCiK_k8ICL7t2Tw6pPbKTtSpYJQTuoknl0T8mQAIkDqSuzSv9xWz8sDweJ4kbqog5DLl1XvTHKX16Z8wtl72riPlm8VCkobQsmIil46OXGxJnk2bSlx8rQJDjunNW5ERG7ppuyp7eno6amGc10YVt3ckNwfsJTR_QJhvVozxyDhqi0nH8ePQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBhGQNS-2o9AD2srKeKqFL6mxdg0R2zBWnI3c_zSvyw312m9tYtokTK2PdBLQbdELayj5VWQfhSW8KiinR6xmbZ0gaINCQ1ei2sB2GQt7X82lxT9yx7SBwEA5HrM7dh3qlsxKrRdQBdysodwMu3o4cTCxdPM6HTHqWOpl-Wip57NXNnAKll7xMFZpkf9YiXAIgx40stNm5558Q5fjx7djwjxuQf5xGS6_VXEuzRen2AhOhPJbQ1KT1T',
];

const rows = [
  ['Men’s Casual Shirt', 'SH-001', 'Allen Solly', 'Men’s Wear', 799, 1299, 62, 'In Stock', 'Blue', '#2563eb', ['S', 'M', 'L', 'XL'], 'Premium cotton casual shirt with comfortable fit.'],
  ['Men’s Printed Shirt', 'SH-002', 'U.S. Polo', 'Men’s Wear', 899, 1599, 24, 'In Stock', 'Navy', '#1e3a8a', ['M', 'L', 'XL'], 'Geometric print in a breathable cotton weave.'],
  ['Men’s Polo T-shirt', 'TS-001', 'Levi’s', 'Men’s Wear', 699, 1199, 48, 'In Stock', 'Olive', '#3f6212', ['S', 'M', 'L'], 'Everyday pique polo with structured collar.'],
  ['Men’s Denim Jeans', 'JN-001', 'Levi’s', 'Men’s Wear', 1299, 2499, 32, 'In Stock', 'Indigo', '#1e40af', ['30', '32', '34', '36'], 'Straight fit denim with a clean indigo wash.'],
  ['Women’s Kurti', 'KR-010', 'Aurelia', 'Women’s Wear', 1099, 1799, 28, 'In Stock', 'Teal', '#0f766e', ['S', 'M', 'L', 'XL'], 'Printed kurti with a light woven texture.'],
  ['Women’s Top', 'TP-220', 'H&M', 'Women’s Wear', 799, 1299, 5, 'Low Stock', 'Sand', '#d6bfae', ['XS', 'S', 'M'], 'Soft drape top for everyday layering.'],
  ['Kids T-shirt', 'KD-012', 'H&M', 'Kids Wear', 499, 799, 46, 'In Stock', 'Yellow', '#eab308', ['S', 'M', 'L'], 'Graphic jersey tee with a relaxed cut.'],
  ['Men’s Chino', 'PT-001', 'Allen Solly', 'Men’s Wear', 1199, 2199, 18, 'In Stock', 'Olive', '#365314', ['30', '32', '34', '36'], 'Stretch cotton chino for weekday dressing.'],
  ['Men’s Hoodie', 'HD-001', 'H&M', 'Men’s Wear', 1499, 2499, 16, 'In Stock', 'Charcoal', '#334155', ['M', 'L', 'XL'], 'Loopback hoodie with brushed inner finish.'],
  ['Men’s Jacket', 'JK-001', 'Levi’s', 'Men’s Wear', 2499, 3999, 3, 'Low Stock', 'Black', '#0f172a', ['S', 'M', 'L'], 'Lightweight utility jacket with clean hardware.'],
  ['Women’s Jeans', 'WJ-250', 'Levi’s', 'Women’s Wear', 1399, 2299, 26, 'In Stock', 'Stone', '#a8a29e', ['28', '30', '32'], 'High-rise straight denim in a washed finish.'],
  ['Men’s Blazer', 'BL-001', 'Arrow', 'Men’s Wear', 3499, 5999, 8, 'In Stock', 'Navy', '#172554', ['38', '40', '42'], 'Tailored blazer with a half-canvas construction.'],
  ['Linen Overshirt', 'SH-031', 'U.S. Polo', 'Men’s Wear', 1299, 2199, 0, 'Out of Stock', 'White', '#f8fafc', ['M', 'L', 'XL'], 'Relaxed linen overshirt for warm-weather edits.'],
  ['Cotton Dress', 'DR-108', 'Aurelia', 'Women’s Wear', 1599, 2699, 14, 'In Stock', 'Coral', '#fb7185', ['S', 'M', 'L'], 'Fluid cotton dress with a clean midi silhouette.'],
  ['Canvas Sneakers', 'FW-084', 'H&M', 'Footwear', 1199, 1999, 21, 'In Stock', 'White', '#f8fafc', ['6', '7', '8', '9'], 'Low-profile canvas sneaker with rubber sole.'],
  ['Leather Belt', 'AC-044', 'Arrow', 'Accessories', 699, 999, 7, 'Low Stock', 'Brown', '#78350f', ['S', 'M', 'L'], 'Full-grain leather belt with brushed buckle.'],
].map((row, index) => ({
  id: `AMB-${String(index + 1).padStart(3, '0')}`,
  name: row[0] as string,
  sku: row[1] as string,
  brand: row[2] as string,
  category: row[3] as string,
  price: row[4] as number,
  mrp: row[5] as number,
  stock: row[6] as number,
  status: row[7] as StockStatus,
  color: row[8] as string,
  colorHex: row[9] as string,
  sizes: row[10] as string[],
  image: stitchImages[index % stitchImages.length],
  description: row[11] as string,
  material: index % 3 === 0 ? '100% Cotton' : index % 3 === 1 ? 'Cotton Blend' : 'Polyester Blend',
  updated: index % 2 === 0 ? 'Today, 10:42 AM' : 'Yesterday, 4:18 PM',
})) as Product[];

export const products = rows;
export const categories = ['Men’s Wear', 'Women’s Wear', 'Kids Wear', 'Ethnic Wear', 'Footwear', 'Accessories'];
export const brands = ['Allen Solly', 'Lee', 'Levi’s', 'U.S. Polo', 'H&M', 'Aurelia', 'Arrow'];
export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
export const colors = [
  { label: 'Black', value: '#0f172a' }, { label: 'Navy', value: '#1e3a8a' },
  { label: 'Blue', value: '#2563eb' }, { label: 'Red', value: '#e11d48' },
  { label: 'Green', value: '#047857' }, { label: 'Beige', value: '#fef3c7' }, { label: 'White', value: '#fff' },
];