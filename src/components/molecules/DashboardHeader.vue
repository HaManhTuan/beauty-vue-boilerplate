<script setup lang="ts">
import { Bell } from 'lucide-vue-next'

import AppBreadcrumb from '@/components/molecules/AppBreadcrumb.vue'
import ThemeToggle from '@/components/molecules/ThemeToggle.vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <header
    class="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4 md:gap-4 md:px-6"
  >
    <SidebarTrigger class="shrink-0" />
    <AppBreadcrumb class="min-w-0 flex-1" />

    <div class="flex items-center gap-1.5">
      <Button variant="ghost" size="icon-sm" class="cursor-pointer" aria-label="Notifications">
        <Bell class="size-4" aria-hidden="true" />
      </Button>

      <ThemeToggle />

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            variant="ghost"
            size="icon-sm"
            class="cursor-pointer rounded-full"
            aria-label="Account menu"
          >
            <Avatar class="size-8">
              <AvatarFallback class="bg-muted text-foreground/80">AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-56">
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer">Profile</DropdownMenuItem>
          <DropdownMenuItem class="cursor-pointer">Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer text-destructive focus:text-destructive">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>

