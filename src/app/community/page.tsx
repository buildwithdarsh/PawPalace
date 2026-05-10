"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, Send, Image as ImageIcon, Smile, BookOpen, Users, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { communityPosts, articles, currentUser } from "@/lib/mock-data"
import { useLoading } from "@/hooks/use-loading"
import { pageLoadDelay } from "@/lib/delays"
import { PageSkeleton } from "@/components/layout/skeleton-cards"

export default function CommunityPage() {
  const isLoading = useLoading(pageLoadDelay)
  const [newPost, setNewPost] = useState("")
  const [composeOpen, setComposeOpen] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(
    new Set(communityPosts.filter((p) => p.isLiked).map((p) => p.id))
  )

  if (isLoading) return <PageSkeleton />

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev)
      if (next.has(postId)) next.delete(postId)
      else next.add(postId)
      return next
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-0 py-0 md:px-4 md:py-8">
      <h1 className="mb-4 px-4 text-xl font-bold md:mb-6 md:px-0 md:text-2xl">Community</h1>

      <Tabs defaultValue="feed">
        <TabsList className="mx-4 md:mx-0">
          <TabsTrigger value="feed" className="min-h-[44px] gap-1 md:min-h-0"><Users className="size-4" /> Feed</TabsTrigger>
          <TabsTrigger value="articles" className="min-h-[44px] gap-1 md:min-h-0"><BookOpen className="size-4" /> Articles</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-4">
          <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
            <div className="space-y-0 md:space-y-4 lg:col-span-2">
              {/* Desktop compose */}
              <Card className="hidden md:block">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea placeholder="Share a pet moment, ask a question, or post a tip..." value={newPost} onChange={(e) => setNewPost(e.target.value)} rows={3} className="resize-none" />
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon-sm"><ImageIcon className="size-4" /></Button>
                          <Button variant="ghost" size="icon-sm"><Smile className="size-4" /></Button>
                        </div>
                        <Button size="sm" className="gap-1" disabled={!newPost.trim()}><Send className="size-3" /> Post</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts - full-width on mobile */}
              {communityPosts.map((post) => (
                <Card key={post.id} className="rounded-none border-x-0 md:rounded-xl md:border-x">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="size-10">
                        <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{post.author.petName} the {post.author.petBreed} &middot; {new Date(post.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</p>
                      </div>
                    </div>
                    <p className="text-sm whitespace-pre-line">{post.content}</p>
                    {post.imageUrl && (
                      <div className="-mx-4 mt-3 aspect-video overflow-hidden bg-muted md:mx-0 md:rounded-xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.imageUrl} alt={`Photo shared by ${post.author.name}`} className="size-full object-cover" />
                      </div>
                    )}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {post.tags.map((tag) => <Badge key={tag} variant="outline" className="text-xs">#{tag}</Badge>)}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex items-center gap-4 md:gap-6">
                      <button onClick={() => toggleLike(post.id)} className="flex min-h-[44px] items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground md:min-h-0">
                        <Heart className={`size-5 md:size-4 ${likedPosts.has(post.id) ? "fill-red-500 text-red-500" : ""}`} />
                        {post.likes + (likedPosts.has(post.id) && !post.isLiked ? 1 : 0) - (!likedPosts.has(post.id) && post.isLiked ? 1 : 0)}
                      </button>
                      <button className="flex min-h-[44px] items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground md:min-h-0">
                        <MessageCircle className="size-5 md:size-4" /> {post.comments}
                      </button>
                      <button className="flex min-h-[44px] items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground md:min-h-0">
                        <Share2 className="size-5 md:size-4" /> Share
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar - hidden on mobile */}
            <div className="hidden space-y-4 lg:block">
              <Card>
                <CardHeader><CardTitle className="text-base">Trending Topics</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {["#PuppyTraining", "#RawDiet", "#CatGrooming", "#AquariumSetup", "#PetBirthday", "#AdoptDontShop"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="mr-1 cursor-pointer">{tag}</Badge>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Breed Groups</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {["Golden Retriever Club", "Persian Cat Lovers", "Beagle Brigade", "German Shepherd Owners", "Indie Dog Admirers"].map((group) => (
                    <div key={group} className="flex items-center justify-between">
                      <span className="text-sm">{group}</span>
                      <Button variant="outline" size="xs">Join</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="articles" className="mt-4 px-4 md:px-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((art) => (
              <Card key={art.id} className="group overflow-hidden transition-shadow hover:shadow-md">
                <div className="aspect-video overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={art.imageUrl} alt={art.title} className="size-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="text-xs">{art.category}</Badge>
                  <h3 className="mt-2 font-medium line-clamp-2">{art.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{art.excerpt}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{art.author} &middot; {art.readTime}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Mobile compose bottom sheet FAB */}
      <Sheet open={composeOpen} onOpenChange={setComposeOpen}>
        <SheetTrigger className="fixed bottom-20 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg active:bg-primary/90 md:hidden">
          <Plus className="size-6" />
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-8 pt-4">
          <SheetTitle>New Post</SheetTitle>
          <div className="mt-4 flex gap-3">
            <Avatar className="size-9">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Share a pet moment..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                rows={4}
                className="resize-none text-base"
                autoFocus
              />
              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]"><ImageIcon className="size-5" /></Button>
                  <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]"><Smile className="size-5" /></Button>
                </div>
                <Button className="min-h-[44px] gap-1.5" disabled={!newPost.trim()} onClick={() => { setNewPost(""); setComposeOpen(false) }}>
                  <Send className="size-4" /> Post
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
