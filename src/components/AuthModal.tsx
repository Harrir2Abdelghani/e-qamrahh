"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle,
  AlertCircle,
  Crown,
  Shield,
  Heart,
  Star
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
}

export default function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const { login, signup, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State for scroll tracking
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust the scroll threshold as needed
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!loginForm.email || !loginForm.password) {
      setError('Please fill in all fields');
      return;
    }

    // Check for admin credentials
    if (loginForm.email === 'admin@qamrah.com' && loginForm.password === 'admin123') {
      const adminSuccess = await login(loginForm.email, loginForm.password);
      if (adminSuccess) {
        setSuccess('Welcome back, Admin!');
        setTimeout(() => {
          onClose();
          window.location.href = '/admin';
        }, 1000);
      } else {
        setError('Failed to login as admin');
      }
      return;
    }

    const success = await login(loginForm.email, loginForm.password);
    if (success) {
      setSuccess('Welcome back!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!signupForm.fullName || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signupForm.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const result = await signup(signupForm.email, signupForm.password, signupForm.fullName);
    if (result.success) {
      setSuccess('Account created successfully! Welcome to Qamrah!');
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setError(result.error || 'Failed to create account');
    }
  };

  const features = [
    {
      icon: Heart,
      title: "Save Favorites",
      description: "Keep track of items you love"
    },
    {
      icon: Star,
      title: "Premium Access",
      description: "Get early access to new arrivals"
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Safe and protected transactions"
    },
    {
      icon: Crown,
      title: "VIP Treatment",
      description: "Exclusive perks and discounts"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        {/* Navigation Bar - Apply scroll class */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200'
            : 'bg-transparent'
        }`}>
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-purple-600">Qamrah</div>
            <div className="flex items-center space-x-4">
              <Button variant="link" onClick={() => onModeChange('login')}>Sign In</Button>
              <Button onClick={() => onModeChange('signup')}>Get Started</Button>
            </div>
          </div>
        </nav>

        <div className="flex min-h-[600px] pt-16"> {/* Added padding top to account for fixed nav */}
          {/* Left Side - Features */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-8 flex-col justify-center text-white">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Join Qamrah</h2>
              <p className="text-purple-100 text-lg">
                Unlock the world of luxury rentals and discover exclusive designer items
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-purple-100">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <p className="text-sm text-purple-100">
                "Qamrah transformed my special events with their amazing collection!"
              </p>
              <p className="text-xs text-purple-200 mt-2">- Sarah K., Verified Customer</p>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <div className="w-full lg:w-1/2 p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-center">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </DialogTitle>
            </DialogHeader>

            <Tabs value={mode} onValueChange={(value) => onModeChange(value as 'login' | 'signup')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="flex items-center space-x-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>{success}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => onModeChange('signup')}
                      className="text-purple-600 hover:text-purple-700 text-sm"
                    >
                      Don't have an account? Sign up
                    </button>
                  </div>
                </form>

                {/* Admin Demo */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <Badge className="bg-purple-600">Demo</Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">Try admin access:</p>
                  <p className="text-xs text-gray-600">
                    <strong>Email:</strong> admin@qamrah.com<br />
                    <strong>Password:</strong> admin123
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupForm.fullName}
                        onChange={(e) => setSignupForm({...signupForm, fullName: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signupEmail">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signupPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="signupPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="flex items-center space-x-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>{success}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => onModeChange('login')}
                      className="text-purple-600 hover:text-purple-700 text-sm"
                    >
                      Already have an account? Sign in
                    </button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { AuthModal };