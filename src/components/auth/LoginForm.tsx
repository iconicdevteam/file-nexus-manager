
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { GoogleIcon, MicrosoftIcon, DropboxIcon } from '../icons/ServiceIcons';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement actual login functionality
    console.log('Login with:', { email, password, rememberMe });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement actual sign up functionality
    console.log('Sign up with:', { email, password });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">FileNexus</CardTitle>
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
          </div>
          <CardDescription>
            Manage your files across platforms
          </CardDescription>
        </CardHeader>
        
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal"
                >
                  Remember me
                </Label>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full mb-4">
                Log in
              </Button>
              
              <div className="w-full flex items-center gap-2 mb-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>
              
              <div className="grid grid-cols-3 gap-2 w-full">
                <Button variant="outline" type="button" className="flex items-center gap-2">
                  <GoogleIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" type="button" className="flex items-center gap-2">
                  <MicrosoftIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" type="button" className="flex items-center gap-2">
                  <DropboxIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="signup">
          <form onSubmit={handleSignUp}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full mb-4">
                Create account
              </Button>
              
              <div className="w-full flex items-center gap-2 mb-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>
              
              <div className="grid grid-cols-3 gap-2 w-full">
                <Button variant="outline" type="button" className="flex items-center gap-2">
                  <GoogleIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" type="button" className="flex items-center gap-2">
                  <MicrosoftIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" type="button" className="flex items-center gap-2">
                  <DropboxIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
