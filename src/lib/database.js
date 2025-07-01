import { supabase, TransactionType, CategoryType } from './supabase'

// Transaction operations
export const transactionService = {
  async getAll(userId, filters = {}) {
    let query = supabase
      .from('transactions')
      .select(`
        *,
        categories (
          id,
          name,
          icon,
          color,
          type
        )
      `)
      .eq('user_id', userId)
      .order('date', { ascending: false })

    if (filters.type) {
      query = query.eq('type', filters.type)
    }

    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id)
    }

    if (filters.start_date) {
      query = query.gte('date', filters.start_date)
    }

    if (filters.end_date) {
      query = query.lte('date', filters.end_date)
    }

    return await query
  },

  async create(transaction) {
    return await supabase
      .from('transactions')
      .insert([transaction])
      .select()
  },

  async update(id, updates) {
    return await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
  },

  async delete(id) {
    return await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
  },

  async getMonthlyStats(userId, year, month) {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`
    const endDate = new Date(year, month, 0).toISOString().split('T')[0]

    return await supabase
      .from('transactions')
      .select('type, amount')
      .eq('user_id', userId)
      .gte('date', startDate)
      .lte('date', endDate)
  }
}

// Category operations
export const categoryService = {
  async getAll(userId, type = null) {
    let query = supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .order('name')

    if (type) {
      query = query.eq('type', type)
    }

    return await query
  },

  async create(category) {
    return await supabase
      .from('categories')
      .insert([category])
      .select()
  },

  async update(id, updates) {
    return await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
  },

  async delete(id) {
    return await supabase
      .from('categories')
      .delete()
      .eq('id', id)
  }
}

// Goal operations
export const goalService = {
  async getAll(userId) {
    return await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  },

  async create(goal) {
    return await supabase
      .from('goals')
      .insert([goal])
      .select()
  },

  async update(id, updates) {
    return await supabase
      .from('goals')
      .update(updates)
      .eq('id', id)
      .select()
  },

  async updateProgress(id, savedAmount) {
    return await supabase
      .from('goals')
      .update({ saved_amount: savedAmount })
      .eq('id', id)
      .select()
  },

  async delete(id) {
    return await supabase
      .from('goals')
      .delete()
      .eq('id', id)
  }
}

// Settings operations
export const settingsService = {
  async get(userId) {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('user_id', userId)
      .single()

    return { data, error }
  },

  async update(userId, settings) {
    return await supabase
      .from('settings')
      .upsert({ user_id: userId, ...settings })
      .select()
  }
}

// Utility functions
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export const getDateRange = (period) => {
  const now = new Date()
  const startDate = new Date()
  
  switch (period) {
    case 'week':
      startDate.setDate(now.getDate() - 7)
      break
    case 'month':
      startDate.setMonth(now.getMonth() - 1)
      break
    case 'year':
      startDate.setFullYear(now.getFullYear() - 1)
      break
    default:
      startDate.setMonth(now.getMonth() - 1)
  }
  
  return {
    start: startDate.toISOString().split('T')[0],
    end: now.toISOString().split('T')[0]
  }
}

