import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Minimize2, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const suggestedQuestions = [
  'Que carreras tienen mas campo laboral?',
  'Cuando son las admisiones?',
  'Que materias llevo en Sistemas?',
];

const predefinedResponses: Record<string, string> = {
  'campo laboral': 'Todas nuestras carreras tienen excelente campo laboral. Ingenieria en Sistemas y Electronica tienen alta demanda en empresas tecnologicas. Industrial y Gestion Empresarial son muy solicitadas en manufactura y consultoria.',
  'admisiones': 'El proceso de admisiones 2025 comienza en enero. Puedes consultar los requisitos en la pagina oficial del TecNM Monclova o acudir al departamento de Servicios Escolares.',
  'materias': 'En Sistemas Computacionales cursaras: Programacion, Bases de datos, Inteligencia Artificial, Desarrollo Web y Movil, Redes, entre otras. El plan de estudios incluye practicas constantes.',
  'maestros': 'Contamos con profesores altamente calificados. Muchos tienen maestria y doctorado, ademas de experiencia industrial.',
  'campus': 'Nuestro campus cuenta con 8 edificios principales, laboratorios equipados, biblioteca digital, centro de computo, talleres especializados y areas deportivas.',
};

function getBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  for (const [keyword, response] of Object.entries(predefinedResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }

  if (lowerMessage.includes('hola') || lowerMessage.includes('buenos')) {
    return 'Hola! Es un gusto saludarte. En que puedo ayudarte? Puedo responder sobre carreras, admisiones, campus, maestros y mas.';
  }

  if (lowerMessage.includes('gracias')) {
    return 'Con gusto! Si tienes mas preguntas, estoy aqui para ayudarte. Exito en tu decision vocacional!';
  }

  return 'Gracias por tu pregunta. Te sugiero contactar directamente al departamento de Orientacion Vocacional para una respuesta mas precisa.';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hola! Soy el asistente de BrujulaTec. Puedo ayudarte con dudas sobre carreras, admisiones, maestros y el campus del ITSM Monclova.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: crypto.randomUUID(),
        text: getBotResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-blue-600 text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className={`fixed bottom-6 right-6 z-50 ${
          isMinimized ? 'h-14' : 'h-[560px]'
        } w-[400px] max-w-[calc(100vw-48px)] transition-all duration-300`}
      >
        <div className="bg-blue-600 rounded-t-2xl px-4 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Asistente BrujulaTec</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-white/80">En linea</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
            >
              <Minimize2 className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="bg-white/95 backdrop-blur-lg flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-blue-50 text-slate-900 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-blue-50 px-4 py-2.5 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100" />
                      <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-white rounded-b-2xl p-3 border-t border-gray-200 shadow-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
