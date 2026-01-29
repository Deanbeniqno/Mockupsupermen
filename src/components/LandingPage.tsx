import { useState, useEffect } from 'react';
import { Scale, Shield, Users, CheckCircle, ArrowRight, Zap, FileCheck, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface LandingPageProps {
  onNavigate: (page: 'registration' | 'login') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const carouselImages = [
    'https://images.unsplash.com/photo-1758840743544-ee7bcb49f622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FsZSUyMG1lYXN1cmVtZW50JTIwZXF1aXBtZW50fGVufDF8fHx8MTc2MDI3NTQwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1759884247194-f1fd2144951b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjAyNzU0MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1742888827024-6d85caf1d09b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBtb2Rlcm58ZW58MXx8fHwxNzYwMjY2NzI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1758873263563-5ba4aa330799?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFsaXR5JTIwY29udHJvbCUyMGluc3BlY3Rpb258ZW58MXx8fHwxNzYwMjYxMjc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-900 p-2.5 rounded-xl shadow-lg">
                <Scale className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-blue-900">SUPERMEN</h1>
                <p className="text-xs text-gray-600">Sistem Metrologi Legal</p>
              </div>
            </div>
            <Button 
              onClick={() => onNavigate('login')}
              variant="ghost"
              className="text-blue-900 hover:bg-blue-50"
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className="relative pt-16 overflow-hidden">
        {/* Image Carousel Background */}
        <div className="relative h-[600px] lg:h-[700px]">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ImageWithFallback
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-transparent" />
            </div>
          ))}
          
          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 px-4 py-1 mb-6">
                  <Zap className="h-3 w-3 mr-1" />
                  Platform Terintegrasi Nasional
                </Badge>
                
                <h2 className="text-white mb-6 leading-tight">
                  Platform Modern<br />
                  untuk Metrologi Legal Indonesia
                </h2>
                <p className="text-xl text-blue-50 mb-8 max-w-xl">
                  Sistem digital terpadu untuk personel metrologi dalam mengelola standar UTTP di seluruh Indonesia
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    onClick={() => onNavigate('registration')}
                    size="lg"
                    className="bg-white text-blue-900 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all group"
                  >
                    Daftar Sekarang
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    onClick={() => onNavigate('login')}
                    size="lg"
                    variant="outline"
                    className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-900"
                  >
                    Login ke Sistem
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl text-white mb-1">1,200+</div>
                    <div className="text-sm text-blue-100">Petugas Aktif</div>
                  </div>
                  <div>
                    <div className="text-3xl text-white mb-1">34</div>
                    <div className="text-sm text-blue-100">Provinsi</div>
                  </div>
                  <div>
                    <div className="text-3xl text-white mb-1">50K+</div>
                    <div className="text-sm text-blue-100">Verifikasi/Tahun</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-900 border-0 px-4 py-1 mb-4">
              Fitur Unggulan
            </Badge>
            <h3 className="text-gray-900 mb-4">
              Mengapa Memilih SUPERMEN?
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Platform terintegrasi dengan fitur lengkap untuk kemudahan kerja Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h4 className="mb-3 text-gray-900">Keamanan Terjamin</h4>
                <p className="text-gray-600 leading-relaxed">
                  Validasi email .go.id dan verifikasi sertifikasi untuk keamanan data maksimal
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileCheck className="h-7 w-7 text-white" />
                </div>
                <h4 className="mb-3 text-gray-900">Standar Nasional</h4>
                <p className="text-gray-600 leading-relaxed">
                  Kelola verifikasi UTTP sesuai regulasi dan standar metrologi Indonesia
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all group">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h4 className="mb-3 text-gray-900">Kolaborasi Mudah</h4>
                <p className="text-gray-600 leading-relaxed">
                  Koordinasi real-time antara petugas, verifikator, dan admin di seluruh Indonesia
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-white mb-6">
            Siap Bergabung dengan SUPERMEN?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Daftar sekarang dan mulai kelola verifikasi metrologi Anda secara digital
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onNavigate('registration')}
              size="lg"
              className="bg-white text-blue-900 hover:bg-blue-50 shadow-xl"
            >
              Mulai Pendaftaran
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => onNavigate('login')}
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-900"
            >
              Sudah Punya Akun? Login
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Scale className="h-5 w-5 text-white" />
                </div>
                <span className="text-white">SUPERMEN</span>
              </div>
              <p className="text-gray-400 text-sm">
                Sistem Metrologi Legal Indonesia - Direktorat Metrologi, Kementerian Perdagangan RI
              </p>
            </div>
            <div>
              <h5 className="text-white mb-4">Kontak</h5>
              <p className="text-gray-400 text-sm mb-2">Email: metrologi@kemendag.go.id</p>
              <p className="text-gray-400 text-sm">Telepon: (021) 1234-5678</p>
            </div>
            <div>
              <h5 className="text-white mb-4">Informasi</h5>
              <p className="text-gray-400 text-sm mb-2">Panduan Pengguna</p>
              <p className="text-gray-400 text-sm">Kebijakan Privasi</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Kementerian Perdagangan RI. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
