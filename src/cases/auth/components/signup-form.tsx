import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertDescription } from "@/components/ui/alert";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSignUp } from "../hooks/use-signup";

const formSchema = z.object({
  name: z.string().nonempty("O nome completo é obrigatório"),
  email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres")
});

export type LoginSchema = z.infer<typeof formSchema>;

export function SignUpForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectURL = searchParams.get("redirect") || "/";
  const { mutate, isPending, error } = useSignUp();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  function onSubmit(values: LoginSchema) {
    mutate(values, {
      onSuccess: () => navigate("/signin")
    });
  }

  return (
    <div className="flex justify-center items-center min-h-[85vh] px-4 bg-white">
      <Card className="w-full max-w-md shadow-xl border border-zinc-200">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-zinc-800">Crie sua conta</h1>
          <p className="text-sm text-zinc-500">
            Ainda não tem uma conta MaterSports?
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-3">
              <AlertDescription className="text-red-700">
                {(error as any).response?.data?.message ||
                  "Erro ao cadastrar cliente"}
              </AlertDescription>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* NAME */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Nome Completo</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Seu nome completo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700">Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isPending}
              >
                {isPending ? "Cadastrando..." : "Cadastre-se"}
              </Button>
            </form>
          </Form>

          <Separator className="my-6" />

          <div className="text-center">
            <h2 className="text-lg font-semibold text-zinc-800 mb-1">
              Já possui conta?
            </h2>
            <p className="text-sm text-zinc-500 mb-4">
              Faça login para acessar sua conta.
            </p>

            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
              onClick={() => navigate("/signin")}
            >
              Entrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}