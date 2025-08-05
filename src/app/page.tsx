import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Shield, 
  Clock, 
  Star, 
  Search, 
  Heart, 
  MapPin, 
  Users,
  ArrowRight,
  CheckCircle,
  Menu,
  X
} from "lucide-react";

export default function QamrahLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6EFE7] via-[#E9F1EF] to-[#F5D4C3]">
      {/* Modern Navigation */}
      <nav className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#E09789] to-[#3C5556] rounded-2xl flex items-center justify-center shadow-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-[#3C5556] to-[#E09789] bg-clip-text text-transparent">
                Qamrah
              </span>
              <p className="text-xs text-[#3C5556] -mt-1">Rental Marketplace</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#features" className="text-[#3C5556] hover:text-[#E09789] transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="text-[#3C5556] hover:text-[#E09789] transition-colors font-medium">How it Works</a>
            <a href="#categories" className="text-[#3C5556] hover:text-[#E09789] transition-colors font-medium">Categories</a>
            <a href="#testimonials" className="text-[#3C5556] hover:text-[#E09789] transition-colors font-medium">Reviews</a>
            <Button className="bg-gradient-to-r from-[#E09789] to-[#3C5556] hover:from-[#F5D4C3] hover:to-[#E09789] text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              Start Exploring
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="outline" size="sm" className="border-[#3C5556] text-[#3C5556] hover:bg-[#E09789] hover:text-white">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center max-w-5xl mx-auto">
          <Badge className="mb-8 bg-[#E09789] text-white border-0 px-6 py-3 text-sm font-medium shadow-lg">
            ✨ Trusted by 15,000+ happy renters
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-[#3C5556] via-[#E09789] to-[#3C5556] bg-clip-text text-transparent">
              Rent Anything,
            </span>
            <br />
            <span className="text-[#E09789]">Anywhere</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#3C5556] mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover amazing products to rent from trusted local owners. 
            From tools to tech, find what you need without the commitment of buying.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-[#E09789] to-[#3C5556] hover:from-[#F5D4C3] hover:to-[#E09789] text-white text-lg px-10 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
              Start Renting Now
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-6 rounded-2xl border-2 border-[#3C5556] text-[#3C5556] hover:bg-[#3C5556] hover:text-white transition-all duration-300">
              <Search className="mr-3 w-6 h-6" />
              Browse Products
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24 bg-white/50 backdrop-blur-sm rounded-3xl mx-8 mb-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-[#3C5556]">Why Choose Qamrah?</h2>
          <p className="text-xl text-[#3C5556]/80 max-w-3xl mx-auto">
            We make renting simple, safe, and convenient for everyone
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-[#F6EFE7] to-[#F5D4C3]">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#E09789] to-[#3C5556] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#3C5556]">Safe & Secure</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-lg text-[#3C5556]/80 leading-relaxed">
                All users are verified and products are insured. Your safety is our top priority with 24/7 support.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-[#E9F1EF] to-[#C8DBD7]">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#E09789] to-[#3C5556] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#3C5556]">Instant Booking</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-lg text-[#3C5556]/80 leading-relaxed">
                Book items instantly with our streamlined process. No waiting, no hassle, just pure convenience.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-[#F5D4C3] to-[#E09789]">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#E09789] to-[#3C5556] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#3C5556]">Quality Guaranteed</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-lg text-[#3C5556]/80 leading-relaxed">
                Every product is quality-checked and rated by our community. Only the best makes it to our platform.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-[#3C5556]">How It Works</h2>
          <p className="text-xl text-[#3C5556]/80 max-w-3xl mx-auto">
            Get started in just three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div className="text-center relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[#E09789] to-[#3C5556] rounded-full flex items-center justify-center mx-auto mb-8 text-white text-3xl font-bold shadow-2xl">
              1
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-[#3C5556]">Search & Discover</h3>
            <p className="text-lg text-[#3C5556]/80 leading-relaxed">
              Browse thousands of items available for rent in your area. Filter by category, price, and location with our smart search.
            </p>
          </div>

          <div className="text-center relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[#E09789] to-[#3C5556] rounded-full flex items-center justify-center mx-auto mb-8 text-white text-3xl font-bold shadow-2xl">
              2
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-[#3C5556]">Book & Pay</h3>
            <p className="text-lg text-[#3C5556]/80 leading-relaxed">
              Reserve your item with secure payment. Choose your rental period and pickup/delivery options seamlessly.
            </p>
          </div>

          <div className="text-center relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[#E09789] to-[#3C5556] rounded-full flex items-center justify-center mx-auto mb-8 text-white text-3xl font-bold shadow-2xl">
              3
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-[#3C5556]">Enjoy & Return</h3>
            <p className="text-lg text-[#3C5556]/80 leading-relaxed">
              Use your rented item and return it on time. Leave a review to help build our trusted community.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section id="categories" className="container mx-auto px-6 py-24 bg-white/50 backdrop-blur-sm rounded-3xl mx-8 mb-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-[#3C5556]">Popular Categories</h2>
          <p className="text-xl text-[#3C5556]/80 max-w-3xl mx-auto">
            Find what you need across thousands of categories
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { name: "Tools & Equipment", icon: "🔧", count: "2,500+ items", color: "from-[#F5D4C3] to-[#E09789]" },
            { name: "Electronics", icon: "📱", count: "1,800+ items", color: "from-[#E9F1EF] to-[#C8DBD7]" },
            { name: "Sports & Outdoor", icon: "⚽", count: "3,200+ items", color: "from-[#F6EFE7] to-[#F5D4C3]" },
            { name: "Party & Events", icon: "🎉", count: "1,500+ items", color: "from-[#E09789] to-[#3C5556]" },
          ].map((category, index) => (
            <Card key={index} className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br ${category.color} cursor-pointer`}>
              <CardContent className="text-center p-8">
                <div className="text-5xl mb-6">{category.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-[#3C5556]">{category.name}</h3>
                <p className="text-[#3C5556]/80 font-medium">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-[#3C5556]">What Our Users Say</h2>
          <p className="text-xl text-[#3C5556]/80 max-w-3xl mx-auto">
            Join thousands of satisfied renters and owners
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Sarah Johnson",
              role: "Event Planner",
              content: "Qamrah saved my event! I rented all the equipment I needed for a fraction of the cost. The quality was amazing!",
              rating: 5
            },
            {
              name: "Mike Chen",
              role: "DIY Enthusiast",
              content: "Perfect for weekend projects. I can try expensive tools without buying them. The community is so helpful!",
              rating: 5
            },
            {
              name: "Emma Davis",
              role: "Student",
              content: "As a student, this is perfect for getting what I need without breaking the bank. The app is so easy to use!",
              rating: 5
            }
          ].map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-xl bg-gradient-to-br from-[#F6EFE7] to-[#F5D4C3] hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-[#E09789] fill-current" />
                  ))}
                </div>
                <p className="text-lg text-[#3C5556] mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-[#3C5556] text-lg">{testimonial.name}</p>
                  <p className="text-[#3C5556]/70">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-[#E09789] to-[#3C5556] rounded-3xl p-16 text-center text-white shadow-2xl">
          <h2 className="text-5xl font-bold mb-6">Ready to Start Renting?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of people who are already saving money and discovering amazing products through Qamrah.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-6 rounded-2xl bg-white text-[#3C5556] hover:bg-[#F6EFE7] shadow-xl">
              Start Renting Today
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 rounded-2xl border-2 border-white text-white hover:bg-white hover:text-[#3C5556]">
              List Your Items
            </Button>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-[#3C5556] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E09789] to-[#F5D4C3] rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-[#3C5556]" />
                </div>
                <span className="text-2xl font-bold">Qamrah</span>
              </div>
              <p className="text-[#C8DBD7] leading-relaxed">
                The trusted marketplace for renting anything you need, anywhere you are. 
                Building communities through shared resources.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-6">Company</h3>
              <ul className="space-y-3 text-[#C8DBD7]">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-6">Support</h3>
              <ul className="space-y-3 text-[#C8DBD7]">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trust & Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-6">Legal</h3>
              <ul className="space-y-3 text-[#C8DBD7]">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#E09789]/20 mt-12 pt-8 text-center text-[#C8DBD7]">
            <p>&copy; 2024 Qamrah. All rights reserved. Building a sustainable future through sharing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
