import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { Loader2, X } from "lucide-react";

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

export function ReviewDialog({ isOpen, onClose, productName, onSubmit }: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (rating === 0) {
      alert("Por favor, selecione uma nota.");
      return;
    }

    setIsSubmitting(true);
    await onSubmit(rating, comment);
    setIsSubmitting(false);
    
    // Limpa o form e fecha
    setRating(0);
    setComment("");
    onClose();
  }

  // Se não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    // Fundo escuro (Overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      
      {/* Caixa do Modal */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 p-6 animate-in zoom-in-95 duration-200">
        
        {/* Botão Fechar (X) */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Cabeçalho */}
        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight">Avaliar Produto</h2>
          <p className="text-sm text-gray-500 mt-1.5">
            O que você achou de <strong className="text-gray-900">{productName}</strong>?
          </p>
        </div>

        {/* Conteúdo */}
        <div className="grid gap-6 py-2">
          
          {/* Estrelas */}
          <div className="flex flex-col items-center gap-3 bg-gray-50 p-4 rounded-lg border border-dashed border-gray-200">
            <span className="text-sm font-medium text-gray-500">Toque nas estrelas para avaliar</span>
            <StarRating size={32} onRatingChange={setRating} initialRating={rating} />
            <span className={`text-sm font-semibold h-5 ${rating > 0 ? 'text-yellow-600' : 'invisible'}`}>
              {rating === 5 ? 'Excelente!' : rating === 4 ? 'Muito bom' : rating === 3 ? 'Bom' : rating === 2 ? 'Ruim' : 'Péssimo'}
            </span>
          </div>

          {/* Comentário (Textarea Nativo) */}
          <div className="grid gap-2">
            <label htmlFor="comment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Comentário (opcional)
            </label>
            <textarea
              id="comment"
              className="flex min-h-[100px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder="Conte sua experiência com o produto..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        {/* Rodapé (Botões) */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || rating === 0}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enviar Avaliação
          </Button>
        </div>

      </div>
    </div>
  );
}