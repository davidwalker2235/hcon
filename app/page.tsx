import Image from "next/image";
import CompetitorsWrapper from "./components/CompetitorsWrapper";
import { CompetitorsProvider } from "./components/CompetitorsContext";
import UploadMockRankingButton from "./components/UploadMockRankingButton";

export default function Home() {
  return (
    <CompetitorsProvider>
      <div className="flex h-screen w-full overflow-hidden flex-col sm:flex-row">
        <div className="w-full sm:w-[35%] h-screen bg-white overflow-y-auto">
          <div className="p-8 flex flex-col">
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
            
            <div className="flex flex-col gap-3 mt-2">
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
              
              <div className="mt-12 flex flex-col items-center gap-6">
                <Image
                  src="/QRCode.png"
                  alt="QR Code"
                  width={300}
                  height={300}
                  className="object-contain"
                />
                {/*<UploadMockRankingButton />*/}
              </div>
            </div>
          </div>
        </div>

        <div 
          className="w-full sm:w-[65%] h-screen relative bg-cover bg-center bg-no-repeat flex items-center justify-center py-4 px-4 sm:px-2 overflow-y-auto"
          style={{
            backgroundImage: 'url(/background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <CompetitorsWrapper />
        </div>
      </div>
    </CompetitorsProvider>
  );
}
