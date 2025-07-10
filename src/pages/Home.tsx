import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Clock, MapPin, Phone, Mail, Diamond as Lemon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Background3D from '../components/Background3D';
import logo from '/src/Lemon Logo - Final.png'

const SimpleLogo = () => {
  return (
    <div className="mb-8">
      <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-white shadow-md mx-auto">
        <img
          src={logo}
          className="w-12 h-12 object-contain"
        />
      </div>
    </div>
  );
};

const TikTokButton = () => {
  return (
    <motion.a
      href="https://www.tiktok.com/@lemon_restaurant"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, duration: 0.8, type: "spring" }}
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
    >
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        className="w-8 h-8 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z"/>
        </svg>
      </motion.div>
      
      {/* Pulse effect */}
      <motion.div
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-black rounded-full -z-10"
      />
    </motion.a>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gyroX = useMotionValue(0);
  const gyroY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);
  
  // Gyroscope-based rotation for mobile
  const gyroRotateX = useSpring(gyroX, springConfig);
  const gyroRotateY = useSpring(gyroY, springConfig);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Gyroscope effect for mobile devices
  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma !== null && event.beta !== null) {
        // Normalize the values and apply some damping
        const normalizedGamma = Math.max(-30, Math.min(30, event.gamma)) / 30;
        const normalizedBeta = Math.max(-30, Math.min(30, event.beta)) / 30;
        
        gyroX.set(normalizedBeta * 5); // Reduced intensity
        gyroY.set(normalizedGamma * 5);
      }
    };

    // Check if device orientation is supported
    if (window.DeviceOrientationEvent) {
      // Request permission for iOS 13+
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((response: string) => {
            if (response === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation);
            }
          })
          .catch(console.error);
      } else {
        // For other devices
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [gyroX, gyroY]);

  // Detect if user is on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <div>
      <Background3D scrollY={scrollY} />
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-10">
        
        <motion.div
          ref={containerRef}
          style={{
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
          className="relative text-center px-4 z-30 max-w-4xl mx-auto"
        >
          <motion.div
            style={{
              rotateX: isMobile ? gyroRotateX : rotateX,
              rotateY: isMobile ? gyroRotateY : rotateY,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="bg-white bg-opacity-85 p-6 sm:p-8 lg:p-[25px] rounded-lg shadow-lg space-y-1 sm:space-y-2" style={{ transform: 'translateZ(50px)' }}>
              <SimpleLogo />
              
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl sm:text-6xl lg:text-8xl font-serif font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400 drop-shadow-[0_4px_8px_rgba(251,191,36,0.3)]"
              >
                LEMON
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-lg sm:text-2xl lg:text-3xl font-serif text-yellow-600 tracking-widest uppercase"
              >
                restaurant
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-xs sm:text-sm text-yellow-500 tracking-wider uppercase"
              >
                by Romeo
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="text-sm sm:text-lg lg:text-2xl mt-4 sm:mt-8 mb-6 sm:mb-12 text-yellow-700 font-serif italic max-w-2xl mx-auto px-4"
              >
                Unde "doar o gustare" devine "trei feluri si un desert"
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="pt-4"
              >
                <Link
                  to="/menu"
                  className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  Vezi meniul nostru
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-30"
        >
          {/* Mobile layout - 2x2 grid */}
          <div className="block sm:hidden px-4">
            <div className="grid grid-cols-2 gap-2 text-yellow-700 text-xs">
              {[
                { icon: Clock, text: "08:00-00:00", href: null },
                { icon: MapPin, text: "Gorneni, Giurgiu", href: "https://maps.google.com/?q=Lemon+Restaurant+Gorneni+Giurgiu" },
                { icon: Phone, text: "0733368272", href: "tel:+40733368272" },
                { icon: Mail, text: "lemonrestaurant@yahoo.com", href: "mailto:lemonrestaurant@yahoo.com" }
              ].map(({ icon: Icon, text, href }, index) => (
                <motion.button 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 + index * 0.1 }}
                  whileHover={href ? { 
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.3 }
                  } : {}}
                  whileTap={href ? { 
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  } : {}}
                  className={`flex items-center space-x-1 rounded-full p-3 font-semibold transition-all duration-300 ${
                    href 
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600 transform hover:-translate-y-1' 
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 text-yellow-700 cursor-default shadow-md'
                  }`}
                  onClick={href ? () => window.open(href, '_blank') : undefined}
                  disabled={!href}
                >
                  <Icon className={`h-3 w-3 flex-shrink-0 ${href ? 'text-white' : 'text-yellow-700'}`} />
                  <span className="truncate">{text}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Desktop layout - horizontal */}
          <div className="hidden sm:flex justify-center space-x-6">
            {[
              { icon: Clock, text: "Program 08:00-00:00", href: null },
              { icon: MapPin, text: "Gorneni, Giurgiu", href: "https://maps.google.com/?q=Lemon+Restaurant+Gorneni+Giurgiu" },
              { icon: Phone, text: "0733368272", href: "tel:+40733368272" },
              { icon: Mail, text: "lemonrestaurant@yahoo.com", href: "mailto:lemonrestaurant@yahoo.com" }
            ].map(({ icon: Icon, text, href }, index) => (
              <motion.button 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + index * 0.1 }}
                whileHover={href ? { 
                  scale: 1.05,
                  y: -4,
                  transition: { duration: 0.3 }
                } : {}}
                whileTap={href ? { 
                  scale: 0.95,
                  transition: { duration: 0.1 }
                } : {}}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  href 
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600 transform hover:-translate-y-1' 
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-yellow-700 cursor-default shadow-md'
                }`}
                onClick={href ? () => window.open(href, '_blank') : undefined}
                disabled={!href}
              >
                <Icon className={`h-5 w-5 ${href ? 'text-white' : 'text-yellow-700'}`} />
                <span>{text}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Photo Gallery Section */}
      <section className="relative min-h-screen bg-white bg-opacity-90 z-10">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-gray-900 mb-4">
              Galeria Noastră
            </h2>
          </motion.div>
          
          {/* Photo Gallery - Mobile: Stair Layout, Desktop: Original Grid */}
          
          {/* Mobile Version - Stair Layout */}
          <div className="flex flex-col space-y-8 sm:hidden">
            {Array.from({ length: 7 }, (_, index) => (
              <motion.div
                key={`photo-${index}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -200 : 200, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 150,
                  damping: 20
                }}
                viewport={{ once: true, margin: "-20px" }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5, 
                  rotateX: 2,
                  transition: { duration: 0.3 }
                }}
                className={`
                  w-3/4 h-64 bg-gradient-to-br from-yellow-100 to-yellow-200 
                  rounded-lg shadow-lg hover:shadow-xl transition-all duration-300
                  flex items-center justify-center text-gray-500 font-serif
                  ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}
                  ${index % 3 === 0 ? 'transform rotate-1' : index % 3 === 1 ? 'transform -rotate-2' : 'transform rotate-3'}
                `}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-yellow-300 rounded-full flex items-center justify-center">
                    <span className="text-3xl">
                      {index === 0 ? '🍽️' : index === 1 ? '🍕' : index === 2 ? '🥘' : index === 3 ? '🍖' : index === 4 ? '🥗' : index === 5 ? '🍰' : '☕'}
                    </span>
                  </div>
                  <p className="text-lg">Foto {index + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Desktop Version - Original Artistic Grid Layout */}
          <div className="hidden sm:grid grid-cols-12 gap-4 auto-rows-[150px]">
            {/* All photos same size (col-span-3 row-span-2) arranged artistically */}
            {Array.from({ length: 12 }, (_, index) => {
              // Define artistic positions for each photo
              const positions = [
                { col: 'col-start-1 col-span-3', row: 'row-start-1 row-span-2' },
                { col: 'col-start-5 col-span-3', row: 'row-start-1 row-span-2' },
                { col: 'col-start-9 col-span-3', row: 'row-start-2 row-span-2' },
                { col: 'col-start-2 col-span-3', row: 'row-start-3 row-span-2' },
                { col: 'col-start-6 col-span-3', row: 'row-start-3 row-span-2' },
                { col: 'col-start-10 col-span-3', row: 'row-start-1 row-span-2' },
                { col: 'col-start-1 col-span-3', row: 'row-start-5 row-span-2' },
                { col: 'col-start-4 col-span-3', row: 'row-start-5 row-span-2' },
                { col: 'col-start-8 col-span-3', row: 'row-start-4 row-span-2' },
                { col: 'col-start-3 col-span-3', row: 'row-start-7 row-span-2' },
                { col: 'col-start-7 col-span-3', row: 'row-start-6 row-span-2' },
                { col: 'col-start-5 col-span-3', row: 'row-start-8 row-span-2' }
              ];
              
              // Define rotation variations for artistic effect
              const rotations = [
                'transform rotate-1',
                'transform -rotate-2',
                'transform rotate-3',
                'transform -rotate-1',
                'transform rotate-2',
                'transform -rotate-3',
                'transform rotate-1',
                'transform -rotate-2',
                'transform rotate-2',
                'transform -rotate-1',
                'transform rotate-3',
                'transform -rotate-2'
              ];
              
              // Define emoji variations
              const emojis = ['🍽️', '🍕', '🥘', '🍖', '🥗', '🍰', '☕', '🍝', '🥙', '🍲', '🧀', '🍷'];

              const galleryImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      
              return (
                <motion.div
                  key={`photo-${index}`}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1 + index * 0.08,
                    type: "spring",
                    stiffness: 100
                  }}
                  >
                    <img
                      src={`/src/photo-${index + 1}.jpg`} // ✅ Replace this path with your actual image path
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />

                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ scale: 1.05, rotateY: 3, rotateX: -2 }}
                  className={`
                    ${positions[index].col} ${positions[index].row}
                    bg-gradient-to-br from-yellow-100 to-yellow-200 
                    rounded-lg shadow-lg hover:shadow-xl transition-all duration-300
                    flex items-center justify-center text-gray-500 font-serif
                    ${rotations[index]}
                  `}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-yellow-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl">{emojis[index]}</span>
                    </div>
                    <p className="text-sm">Foto {index + 1}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-white to-yellow-50 z-10">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-gray-900 mb-8">
              Despre Noi
            </h2>
            <div className="max-w-4xl mx-auto text-lg text-gray-700 font-serif leading-relaxed">
              <p className="text-xl leading-relaxed">
                În Gorneni, la km 28, Lemon nu se laudă cu numele, se afirmă prin gust. Aici, burgerul are atitudine, pizza vine direct din visele pofticioșilor, iar sarmalele au fost declarate oficial „armă de seducție culinară". Ciorba de burtă alină mai bine decât o conversație cu bunica, iar micii… sunt exact ce trebuie, când trebuie. Atmosfera e caldă, cu râsete care umplu terasa. Lemon nu e doar un restaurant, e un popas de poveste în meniul vieții.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/menu"
              className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            >
              Explorează Meniul Complet
            </Link>
          </motion.div>
        </div>
      </section>
      
      <TikTokButton />
    </div>
  );
};

export default Home;
