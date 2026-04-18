export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          ai_summary: string | null
          ai_tags: string[] | null
          author: string
          available: boolean | null
          cover_url: string | null
          created_at: string | null
          current_copies: number | null
          description: string | null
          genres: string[] | null
          id: string
          is_for_sale: boolean | null
          isbn: string | null
          price: number | null
          purchase_count: number | null
          stock_quantity: number | null
          title: string
          total_copies: number | null
        }
      }
    }
  }
}

