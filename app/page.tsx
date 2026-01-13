import Image from "next/image";
import PlanRow from "./components/PlanRow";

export default function Home() {
  const plans = [
    {
      title: "ZeroCool",
      iconColor: "#4ade80"
    },
    {
      title: "AcidBurn",
      iconColor: "#3b82f6"
    },
    {
      title: "CrashOverride",
      iconColor: "#f97316"
    },
    {
      title: "CerealKiller",
      iconColor: "#8b5cf6"
    },
    {
      title: "ThePlague",
      iconColor: "#06b6d4"
    },
    {
      title: "PhiberOptik",
      iconColor: "#10b981"
    },
    {
      title: "LordNikon",
      iconColor: "#f59e0b"
    },
    {
      title: "Trinity",
      iconColor: "#ec4899"
    }
  ];
  return (
    <div className="flex h-screen w-full overflow-hidden flex-col sm:flex-row">
      {/* Panel izquierdo - 20% del ancho con logo y texto */}
      <div className="w-full sm:w-[35%] h-screen bg-white overflow-y-auto">
        <div className="p-8 flex flex-col">
          {/* Logo arriba a la izquierda */}
          <div className="mb-12">
            <Image
              src="/erni_logo.jpeg"
              alt="ERNI Logo"
              width={150}
              height={60}
              priority
              className="object-contain"
            />
          </div>
          
          {/* Texto debajo del logo */}
          <div className="flex flex-col gap-3 mt-2">
            {/* "Security that enables innovation" */}
            <div className="flex flex-col">
              <h1 
                className="text-5xl font-bold leading-tight mb-1" 
                style={{ 
                  fontFamily: 'sans-serif',
                  color: '#1a3a5c',
                  letterSpacing: '-0.02em'
                }}
              >
                Security that enables Innovation
              </h1>
            </div>
            
            {/* "better ask ERNI" */}
            <div className="mt-2">
              <p 
                className="text-xl leading-relaxed" 
                style={{ 
                  fontFamily: 'sans-serif', 
                  color: '#5a9fb0'
                }}
              >
                better ask <span style={{ fontFamily: 'serif', color: '#4a4a4a', fontWeight: 'normal', fontStyle: 'normal' }}>ERNI</span>
              </p>
            </div>
            
            {/* Código QR centrado */}
            <div className="mt-12 flex justify-center">
              <Image
                src="/QRCode.png"
                alt="QR Code"
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - 80% del ancho con imagen de fondo */}
      <div 
        className="w-full sm:w-[65%] h-screen relative bg-cover bg-center bg-no-repeat flex items-center justify-center py-4 px-4 sm:px-2 overflow-y-auto"
        style={{
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Card semi-transparente con efecto difuminado */}
        <div className="bg-white/40 backdrop-blur-md rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-1xl mx-[30px] sm:mx-4 md:mx-8 lg:mx-[30px] my-4" >
          <div className="flex flex-col gap-1.5">
            {plans.map((plan, index) => (
              <PlanRow
                key={index}
                title={plan.title}
                iconColor={plan.iconColor}
                arrow={index === 0 ? "up" : index === 1 ? "down" : undefined}
                arrowSize={60}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
