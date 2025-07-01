import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  TrendingUp, 
  Target, 
  PieChart, 
  Shield, 
  Smartphone, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Wallet,
  CreditCard,
  DollarSign
} from 'lucide-react'
import '../App.css'

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.1 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  )
}

const StatCard = ({ number, label, delay = 0 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.1 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  )
}

export function LandingPage({ onGetStarted }) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  
  const features = [
    {
      icon: Wallet,
      title: "Smart Budget Tracking",
      description: "Automatically categorize expenses and track your spending patterns with intelligent insights."
    },
    {
      icon: PieChart,
      title: "Visual Analytics",
      description: "Beautiful charts and graphs that make understanding your finances simple and engaging."
    },
    {
      icon: Target,
      title: "Goal Setting",
      description: "Set and track financial goals with progress monitoring and achievement celebrations."
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your financial data is protected with enterprise-grade encryption and security measures."
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description: "Access your budget from anywhere with our responsive web app and mobile-friendly design."
    },
    {
      icon: BarChart3,
      title: "Real-time Insights",
      description: "Get instant insights into your spending habits and receive personalized recommendations."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "BudgetMate helped me save $5,000 in just 6 months. The goal tracking feature is amazing!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Software Engineer",
      content: "Finally, a budget app that's both powerful and easy to use. The analytics are incredibly helpful.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Teacher",
      content: "I love how BudgetMate makes budgeting feel less overwhelming. The interface is beautiful and intuitive.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen flex items-center">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full opacity-40"
        />
        <motion.div 
          style={{ y: y1 }}
          className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-200 rounded-full opacity-50"
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                🎉 Now Available - Start Your Financial Journey
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Take Control of Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}Finances
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                BudgetMate is the smart, beautiful way to track expenses, set goals, 
                and build better financial habits. Join thousands who've transformed their money management.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700"
                onClick={onGetStarted}
              >
                Start Free Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2"
              >
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <StatCard number="10K+" label="Happy Users" delay={0.1} />
              <StatCard number="$2M+" label="Money Saved" delay={0.2} />
              <StatCard number="4.9★" label="App Rating" delay={0.3} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-green-100 text-green-800">
              ✨ Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="text-blue-600"> Succeed Financially</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From intelligent expense tracking to goal achievement, BudgetMate provides 
              all the tools you need to master your money.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              🚀 Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Started in
              <span className="text-purple-600"> 3 Easy Steps</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up & Connect",
                description: "Create your account and set up your financial profile in under 2 minutes.",
                icon: Users
              },
              {
                step: "02", 
                title: "Track & Categorize",
                description: "Add transactions and let our smart categorization organize your expenses automatically.",
                icon: CreditCard
              },
              {
                step: "03",
                title: "Analyze & Achieve",
                description: "View insights, set goals, and watch your financial health improve over time.",
                icon: TrendingUp
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">
              💬 User Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Loved by
              <span className="text-yellow-600"> Thousands</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how BudgetMate has helped people just like you achieve their financial goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <CardDescription className="text-lg italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-gray-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of users who have already taken control of their financial future with BudgetMate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100"
                onClick={onGetStarted}
              >
                Start Your Journey Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600"
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-75">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl font-bold">💰</span>
              </div>
              <span className="text-2xl font-bold">BudgetMate</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your smart companion for financial success.
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500">
              © 2024 BudgetMate. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

