"use client"

import { useState } from "react"
import Link from "next/link"
import { PawPrint, Phone, ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"phone" | "otp">("phone")

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-6 md:py-12">
      <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-primary">
            <PawPrint className="size-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold leading-none tracking-tight">Welcome to PawPalace</h1>
          <CardDescription>Sign in to manage your pets and shop</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-4 space-y-4">
              {step === "phone" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                    <div className="flex gap-2">
                      <span className="flex h-11 items-center rounded-lg border bg-muted px-3 text-base text-muted-foreground md:h-9 md:text-sm">+91</span>
                      <Input id="phone" placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="min-h-[44px] flex-1 text-base md:min-h-0 md:text-sm" />
                    </div>
                  </div>
                  <Button className="w-full min-h-[44px] gap-2" onClick={() => { if (phone.length >= 10) setStep("otp") }}>
                    Send OTP <ArrowRight className="size-4" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP sent to +91 {phone}</Label>
                    <Input id="otp" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="min-h-[48px] text-center text-xl tracking-widest md:min-h-0 md:text-lg" inputMode="numeric" />
                    <p className="text-xs text-muted-foreground text-center">Didn&apos;t receive? <button className="text-primary hover:underline">Resend OTP</button></p>
                  </div>
                  <Button className="w-full min-h-[44px]" asChild>
                    <Link href="/">Verify &amp; Sign In</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setStep("phone")}>Change Number</Button>
                </>
              )}

              <div className="relative my-4">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">or continue with</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline">Google</Button>
                <Button variant="outline">Apple</Button>
              </div>
            </TabsContent>

            <TabsContent value="register" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your name" className="min-h-[44px] text-base md:min-h-0 md:text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="you@email.com" type="email" className="min-h-[44px] text-base md:min-h-0 md:text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-phone">Mobile Number</Label>
                <div className="flex gap-2">
                  <span className="flex h-11 items-center rounded-lg border bg-muted px-3 text-base text-muted-foreground md:h-9 md:text-sm">+91</span>
                  <Input id="reg-phone" placeholder="98765 43210" type="tel" className="min-h-[44px] flex-1 text-base md:min-h-0 md:text-sm" />
                </div>
              </div>
              <Button className="w-full min-h-[44px] gap-2">
                Create Account <ArrowRight className="size-4" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </TabsContent>
          </Tabs>

          <div className="mt-4 flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Shield className="size-3" /> Secured with OTP verification via MSG91
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
