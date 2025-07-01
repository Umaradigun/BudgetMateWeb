import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { transactionService, categoryService } from '../lib/database'
import '../App.css'

const DEFAULT_CATEGORIES = {
  expense: [
    { name: 'Food & Dining', icon: '🍽️', color: '#ef4444' },
    { name: 'Transportation', icon: '🚗', color: '#3b82f6' },
    { name: 'Shopping', icon: '🛍️', color: '#8b5cf6' },
    { name: 'Entertainment', icon: '🎬', color: '#f59e0b' },
    { name: 'Bills & Utilities', icon: '⚡', color: '#10b981' },
    { name: 'Healthcare', icon: '🏥', color: '#ef4444' },
  ],
  income: [
    { name: 'Salary', icon: '💼', color: '#10b981' },
    { name: 'Freelance', icon: '💻', color: '#3b82f6' },
    { name: 'Investment', icon: '📈', color: '#8b5cf6' },
    { name: 'Other Income', icon: '💰', color: '#f59e0b' },
  ]
}

export function TransactionForm({ onClose, onSuccess, transaction = null }) {
  const { user } = useAuth()
  const [type, setType] = useState(transaction?.type || 'expense')
  const [amount, setAmount] = useState(transaction?.amount?.toString() || '')
  const [categoryId, setCategoryId] = useState(transaction?.category_id || '')
  const [date, setDate] = useState(transaction?.date || new Date().toISOString().split('T')[0])
  const [note, setNote] = useState(transaction?.note || '')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCategories()
  }, [type, user])

  const loadCategories = async () => {
    try {
      const { data, error } = await categoryService.getAll(user.id, type)
      if (error) throw error
      
      if (!data || data.length === 0) {
        // Create default categories if none exist
        await createDefaultCategories()
      } else {
        setCategories(data)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    }
  }

  const createDefaultCategories = async () => {
    try {
      const defaultCats = DEFAULT_CATEGORIES[type]
      const createdCategories = []
      
      for (const cat of defaultCats) {
        const { data, error } = await categoryService.create({
          user_id: user.id,
          name: cat.name,
          icon: cat.icon,
          color: cat.color,
          type: type
        })
        
        if (!error && data) {
          createdCategories.push(data[0])
        }
      }
      
      setCategories(createdCategories)
    } catch (error) {
      console.error('Error creating default categories:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const transactionData = {
        user_id: user.id,
        type,
        amount: parseFloat(amount),
        category_id: categoryId,
        date,
        note: note.trim() || null
      }

      let result
      if (transaction) {
        result = await transactionService.update(transaction.id, transactionData)
      } else {
        result = await transactionService.create(transactionData)
      }

      if (result.error) throw result.error
      
      onSuccess()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {transaction ? 'Edit Transaction' : 'Add Transaction'}
              </CardTitle>
              <CardDescription>
                {transaction ? 'Update your transaction details' : 'Record a new income or expense'}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Transaction Type */}
            <div className="space-y-2">
              <Label>Transaction Type</Label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={type === 'expense' ? 'default' : 'outline'}
                  onClick={() => setType('expense')}
                  className="flex-1"
                >
                  Expense
                </Button>
                <Button
                  type="button"
                  variant={type === 'income' ? 'default' : 'outline'}
                  onClick={() => setType('income')}
                  className="flex-1"
                >
                  Income
                </Button>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center space-x-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Note */}
            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Textarea
                id="note"
                placeholder="Add a note about this transaction..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Saving...' : (transaction ? 'Update' : 'Add Transaction')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

