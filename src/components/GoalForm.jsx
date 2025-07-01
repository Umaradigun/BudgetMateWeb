import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { goalService, formatCurrency } from '../lib/database'
import '../App.css'

const GOAL_TEMPLATES = [
  { name: 'Emergency Fund', amount: 5000, description: 'Build a safety net for unexpected expenses' },
  { name: 'Vacation', amount: 2000, description: 'Save for your dream vacation' },
  { name: 'New Car', amount: 15000, description: 'Save for a reliable vehicle' },
  { name: 'Home Down Payment', amount: 50000, description: 'Save for your first home' },
  { name: 'Wedding', amount: 10000, description: 'Plan your special day' },
  { name: 'Education', amount: 8000, description: 'Invest in your future' },
]

export function GoalForm({ onClose, onSuccess, goal = null }) {
  const { user } = useAuth()
  const [title, setTitle] = useState(goal?.title || '')
  const [targetAmount, setTargetAmount] = useState(goal?.target_amount?.toString() || '')
  const [deadline, setDeadline] = useState(goal?.deadline || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const handleTemplateSelect = (template) => {
    setTitle(template.name)
    setTargetAmount(template.amount.toString())
    setSelectedTemplate(template)
    
    // Set deadline to 1 year from now if not editing
    if (!goal) {
      const nextYear = new Date()
      nextYear.setFullYear(nextYear.getFullYear() + 1)
      setDeadline(nextYear.toISOString().split('T')[0])
    }
  }

  const calculateMonthlyTarget = () => {
    if (!targetAmount || !deadline) return 0
    
    const target = parseFloat(targetAmount)
    const deadlineDate = new Date(deadline)
    const today = new Date()
    
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
    
    if (diffMonths <= 0) return target
    
    return target / diffMonths
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const goalData = {
        user_id: user.id,
        title: title.trim(),
        target_amount: parseFloat(targetAmount),
        deadline,
        saved_amount: goal?.saved_amount || 0
      }

      let result
      if (goal) {
        result = await goalService.update(goal.id, goalData)
      } else {
        result = await goalService.create(goalData)
      }

      if (result.error) throw result.error
      
      onSuccess()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const monthlyTarget = calculateMonthlyTarget()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {goal ? 'Edit Goal' : 'Create Financial Goal'}
              </CardTitle>
              <CardDescription>
                {goal ? 'Update your goal details' : 'Set a target and deadline for your savings'}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!goal && (
            <div className="mb-6">
              <Label className="text-base font-medium mb-3 block">Goal Templates</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {GOAL_TEMPLATES.map((template, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={selectedTemplate === template ? "default" : "outline"}
                    onClick={() => handleTemplateSelect(template)}
                    className="h-auto p-4 text-left justify-start"
                  >
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(template.amount)}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Goal Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title</Label>
              <Input
                id="title"
                placeholder="e.g., Emergency Fund, Vacation, New Car"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Target Amount */}
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="targetAmount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="pl-8"
                  required
                />
              </div>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline">Target Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            {/* Goal Summary */}
            {targetAmount && deadline && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Goal Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target Amount:</span>
                      <span className="font-medium">{formatCurrency(parseFloat(targetAmount))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-medium">{new Date(deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly Target:</span>
                      <span className="font-medium text-blue-600">
                        {formatCurrency(monthlyTarget)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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
                {loading ? 'Saving...' : (goal ? 'Update Goal' : 'Create Goal')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

