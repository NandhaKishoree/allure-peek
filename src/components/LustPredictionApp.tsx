import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Heart, Sparkles, Camera } from 'lucide-react';
import { toast } from 'sonner';
import SparkleEffect from '@/components/SparkleEffect';

interface PredictionResult {
  percentage: number;
  title: string;
  description: string;
  advice: string;
}

const LustPredictionApp: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size should be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const analyzeLust = useCallback(async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis with a delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    // Generate mock prediction based on some "analysis"
    const baseScore = Math.floor(Math.random() * 40) + 50; // 50-90 range
    const variations = [
      { range: [85, 95], title: "Absolutely Irresistible! 🔥", description: "Your aura radiates pure magnetism and intense attraction.", advice: "You have that rare combination of confidence and allure that drives people wild!" },
      { range: [75, 84], title: "Highly Desirable ✨", description: "You possess an enchanting charm that captivates hearts effortlessly.", advice: "Your natural charisma and appeal make you incredibly attractive to others." },
      { range: [65, 74], title: "Quite Alluring 💫", description: "There's something mysteriously attractive about your presence.", advice: "Your subtle magnetism and inner beauty shine through beautifully." },
      { range: [50, 64], title: "Charmingly Appealing 💖", description: "You have a warm and inviting energy that draws people in.", advice: "Your genuine personality and kind spirit make you wonderfully attractive." },
    ];
    
    const matchedVariation = variations.find(v => baseScore >= v.range[0] && baseScore <= v.range[1]) || variations[variations.length - 1];
    
    const finalResult: PredictionResult = {
      percentage: baseScore,
      title: matchedVariation.title,
      description: matchedVariation.description,
      advice: matchedVariation.advice,
    };
    
    setResult(finalResult);
    setIsAnalyzing(false);
  }, [uploadedImage]);

  const resetApp = useCallback(() => {
    setUploadedImage(null);
    setResult(null);
    setIsAnalyzing(false);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-card/95 backdrop-blur-sm border-border/50 shadow-glow-mystical relative overflow-hidden">
        <SparkleEffect />
        <div className="p-8 space-y-6 relative z-10">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-primary mr-2 animate-float" />
              <Sparkles className="w-6 h-6 text-accent animate-sparkle" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-romantic bg-clip-text text-transparent">
              Lust Meter
            </h1>
            <p className="text-muted-foreground">
              Discover your irresistible magnetism through the power of AI
            </p>
          </div>

          {/* Upload Area */}
          {!uploadedImage && (
            <div
              className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary/60 transition-all duration-300 hover:shadow-glow-romantic cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer space-y-4 block">
                <div className="flex justify-center">
                  <Upload className="w-12 h-12 text-primary/70" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">Upload your photo</p>
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or click to select
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Image Preview */}
          {uploadedImage && !result && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-64 object-cover rounded-xl shadow-glow-romantic"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="text-sm text-foreground">Analyzing your magnetism...</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={analyzeLust} 
                  disabled={isAnalyzing}
                  variant="default"
                  className="flex-1 bg-gradient-romantic hover:shadow-glow-passion transition-all duration-300"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Predict Lust Level'}
                </Button>
                <Button 
                  onClick={resetApp}
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-6 animate-result-reveal">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="text-6xl font-bold bg-gradient-passion bg-clip-text text-transparent animate-glow-pulse">
                    {result.percentage}%
                  </div>
                  <div className="absolute -inset-4 bg-gradient-romantic rounded-full opacity-20 animate-pulse"></div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mt-2 mb-4">
                  {result.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {result.description}
                </p>
                <div className="bg-muted/50 rounded-lg p-4 border border-accent/20">
                  <p className="text-sm text-foreground italic">
                    💫 {result.advice}
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={resetApp}
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/10"
              >
                Try Another Photo
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LustPredictionApp;