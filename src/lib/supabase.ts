import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface PicnicOrder {
  id?: string
  member_name: string
  member_class?: string
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
  total_amount: number
  engraving_text?: string
  status: 'pending' | 'paid' | 'collected'
  created_at?: string
}

export async function savePicnicOrder(order: PicnicOrder) {
  if (!supabase) {
    // In mockup mode, persist to localStorage
    const saved = localStorage.getItem('cma_picnic_orders')
    const orders: PicnicOrder[] = saved ? JSON.parse(saved) : []
    const newOrder: PicnicOrder = {
      ...order,
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      created_at: new Date().toISOString()
    }
    orders.push(newOrder)
    localStorage.setItem('cma_picnic_orders', JSON.stringify(orders))
    return { data: newOrder, error: null }
  }

  try {
    const { data, error } = await supabase
      .from('picnic_orders')
      .insert([order])
      .select()
      .single()
    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}
