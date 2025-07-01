import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { PlusCircle, Search, Filter, Edit, Trash2 } from 'lucide-react'
import { formatCurrency } from '../lib/database'
import { TransactionForm } from './TransactionForm'
import '../App.css'

export function TransactionList({ transactions, onUpdate, onAddNew }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [editingTransaction, setEditingTransaction] = useState(null)

  // Filter and search transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.categories?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.note?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === 'all' || transaction.type === filterType
    
    return matchesSearch && matchesType
  })

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(transaction)
    return groups
  }, {})

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
  }

  const handleDelete = async (transactionId) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        // In a real app, you would call the delete API here
        console.log('Delete transaction:', transactionId)
        onUpdate()
      } catch (error) {
        console.error('Error deleting transaction:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Transactions</h2>
          <p className="text-muted-foreground">
            {filteredTransactions.length} of {transactions.length} transactions
          </p>
        </div>
        <Button onClick={onAddNew}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="income">Income Only</SelectItem>
                <SelectItem value="expense">Expenses Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      {Object.keys(groupedTransactions).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedTransactions)
            .sort(([a], [b]) => new Date(b) - new Date(a))
            .map(([date, dayTransactions]) => (
              <Card key={date}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{date}</CardTitle>
                  <CardDescription>
                    {dayTransactions.length} transaction{dayTransactions.length !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dayTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-lg">
                              {transaction.categories?.icon || '💰'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <p className="font-medium">
                                {transaction.categories?.name || 'Unknown Category'}
                              </p>
                              <Badge 
                                variant={transaction.type === 'income' ? 'default' : 'secondary'}
                                className={transaction.type === 'income' ? 'bg-green-600' : 'bg-red-600'}
                              >
                                {transaction.type}
                              </Badge>
                            </div>
                            {transaction.note && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {transaction.note}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className={`font-semibold ${
                              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'income' ? '+' : '-'}
                              {formatCurrency(transaction.amount)}
                            </p>
                          </div>
                          
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(transaction)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(transaction.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No transactions found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Start by adding your first transaction.'
              }
            </p>
            {!searchTerm && filterType === 'all' && (
              <Button onClick={onAddNew}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Your First Transaction
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Transaction Modal */}
      {editingTransaction && (
        <TransactionForm
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onSuccess={() => {
            setEditingTransaction(null)
            onUpdate()
          }}
        />
      )}
    </div>
  )
}

