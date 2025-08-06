import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Brain, 
  ArrowRight, 
  ArrowLeft, 
  Lightbulb
} from 'lucide-react';

export default function QuizDemoPage() {
  // Mock question for demonstration
  const demoQuestion = {
    topic: 'Buoyancy Control Techniques',
    difficulty: 2,
    question: 'What is the most efficient way to achieve fine buoyancy adjustments underwater?',
    options: [
      'Using large BCD inflations and deflations',
      'Controlled breathing techniques',
      'Swimming up or down with fins',
      'Adjusting weight belt position'
    ],
    correctAnswer: 1,
    explanation: 'Controlled breathing is the most efficient method for fine buoyancy control. Inhaling makes you slightly more buoyant, exhaling makes you less buoyant.',
    estimatedTime: 55
  };

  const progress = 30; // 3 out of 10 questions

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-blue-950 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Adaptive Session Demo</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question 3 of 10</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">
                  {demoQuestion.topic}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                    Medium
                  </Badge>
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    ~{demoQuestion.estimatedTime}s
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Question */}
              <div className="text-lg font-medium leading-relaxed">
                {demoQuestion.question}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {demoQuestion.options.map((option, index) => {
                  let buttonClass = "justify-start text-left h-auto p-4 ";
                  
                  if (index === 1) {
                    // Show selected answer (correct one)
                    buttonClass += "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-950 dark:border-blue-400";
                  } else {
                    buttonClass += "hover:bg-gray-50 dark:hover:bg-gray-800";
                  }

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={buttonClass}
                    >
                      <span className="font-medium mr-3">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </Button>
                  );
                })}
              </div>

              {/* Demo explanation (shown as if answer was submitted) */}
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-green-900 dark:text-green-100 mb-1">
                      ✅ Correct! Explanation
                    </div>
                    <div className="text-green-800 dark:text-green-200 text-sm">
                      {demoQuestion.explanation}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1">
                  Next Question
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Features */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Adaptive Selection</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  This question was selected based on your weak performance in buoyancy control
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Difficulty Adjusted</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Medium difficulty chosen based on your 72% recent accuracy
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <Lightbulb className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Immediate Feedback</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Explanations help reinforce learning and correct misconceptions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}