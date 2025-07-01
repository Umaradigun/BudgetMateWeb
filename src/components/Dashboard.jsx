import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { PlusCircle, TrendingUp, TrendingDown, Target, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { transactionService, goalService, formatCurrency } from '../lib/database'
import { TransactionForm } from './TransactionForm'
import { GoalForm } from './GoalForm'
import { TransactionList } from './TransactionList'
import { SpendingChart } from './SpendingChart'
import '../App.css'

export function Dashboard() {
  const { user, signOut } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [goals, setGoals] = useState([])
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  })
  const [loading, setLoading] = useState(true)
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Load transactions
      const { data: transactionData, error: transactionError } = await transactionService.getAll(user.id)
      if (transactionError) throw transactionError
      
      setTransactions(transactionData || [])
      
      // Calculate stats
      const income = transactionData?.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) || 0
      const expenses = transactionData?.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) || 0
      
      setStats({
        totalIncome: income,
        totalExpenses: expenses,
        balance: income - expenses
      })
      
      // Load goals
      const { data: goalData, error: goalError } = await goalService.getAll(user.id)
      if (goalError) throw goalError
      
      setGoals(goalData || [])
      
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const recentTransactions = transactions.slice(0, 5)
  const activeGoals = goals.filter(goal => goal.saved_amount < goal.target_amount)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your financial data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">💰</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">BudgetMate</h1>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === 'overview' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === 'transactions' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Transactions
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === 'analytics' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('goals')}
                className={`px-3 py-2 text-sm font-medium ${
                  activeTab === 'goals' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Goals
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email?.split('@')[0]}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(stats.totalIncome)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {formatCurrency(stats.totalExpenses)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Balance</CardTitle>
                  <Target className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${
                    stats.balance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(stats.balance)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => setShowTransactionForm(true)}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Transaction
              </Button>
              <Button variant="outline" onClick={() => setShowGoalForm(true)}>
                <Target className="w-4 h-4 mr-2" />
                Create Goal
              </Button>
            </div>

            {/* Recent Transactions and Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activity</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentTransactions.length > 0 ? (
                    <div className="space-y-4">
                      {recentTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <span>{transaction.categories?.icon || '💰'}</span>
                            </div>
                            <div>
                              <p className="font-medium">{transaction.categories?.name || 'Unknown'}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className={`font-medium ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No transactions yet. Add your first transaction to get started!
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Goals</CardTitle>
                  <CardDescription>Your financial goals progress</CardDescription>
                </CardHeader>
                <CardContent>
                  {activeGoals.length > 0 ? (
                    <div className="space-y-4">
                      {activeGoals.slice(0, 3).map((goal) => {
                        const progress = (goal.saved_amount / goal.target_amount) * 100
                        return (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <p className="font-medium">{goal.title}</p>
                              <Badge variant="outline">{progress.toFixed(0)}%</Badge>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>{formatCurrency(goal.saved_amount)}</span>
                              <span>{formatCurrency(goal.target_amount)}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No active goals. Create your first goal to start saving!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <TransactionList 
            transactions={transactions} 
            onUpdate={loadData}
            onAddNew={() => setShowTransactionForm(true)}
          />
        )}

        {activeTab === 'analytics' && (
          <SpendingChart transactions={transactions} />
        )}

        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Financial Goals</h2>
              <Button onClick={() => setShowGoalForm(true)}>
                <Target className="w-4 h-4 mr-2" />
                Create Goal
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => {
                const progress = (goal.saved_amount / goal.target_amount) * 100
                const isCompleted = progress >= 100
                
                return (
                  <Card key={goal.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {goal.title}
                        {isCompleted && <Badge className="bg-green-600">Completed</Badge>}
                      </CardTitle>
                      <CardDescription>
                        Target: {formatCurrency(goal.target_amount)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${
                              isCompleted ? 'bg-green-600' : 'bg-blue-600'
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {formatCurrency(goal.saved_amount)} saved
                          </span>
                          <span className="font-medium">
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            
            {goals.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No goals yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first financial goal to start saving with purpose.
                  </p>
                  <Button onClick={() => setShowGoalForm(true)}>
                    Create Your First Goal
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {showTransactionForm && (
        <TransactionForm 
          onClose={() => setShowTransactionForm(false)}
          onSuccess={() => {
            setShowTransactionForm(false)
            loadData()
          }}
        />
      )}

      {showGoalForm && (
        <GoalForm 
          onClose={() => setShowGoalForm(false)}
          onSuccess={() => {
            setShowGoalForm(false)
            loadData()
          }}
        />
      )}
    </div>
  )
}

