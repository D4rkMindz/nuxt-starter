<!-- components/Footer.vue -->
<template>
  <footer class="mt-auto bg-card border-t border-border">
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand & Description -->
        <div class="md:col-span-2 space-y-4">
          <div class="space-y-2">
            <h3 class="text-xl font-medium">HEIMR</h3>
            <p class="text-muted-foreground max-w-md">
              some introduction here...
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <a
                v-for="social in links.social"
                :key="social.name"
                :href="social.href"
                :aria-label="social.name"
                class="inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-foreground/5 transition-colors"
            >
              <component :is="social.icon" class="h-4 w-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="font-medium">Quick Links</h4>
          <nav class="flex flex-col space-y-2">
            <a
                v-for="link in links.quick"
                :key="link.name"
                :href="link.href"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              {{ link.name }}
            </a>
          </nav>
        </div>

        <!-- Resources -->
        <div class="space-y-4">
          <h4 class="font-medium">Resources</h4>
          <nav class="flex flex-col space-y-2">
            <a
                v-for="link in links.resources"
                :key="link.name"
                :href="link.href"
                class="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center"
            >
              {{ link.name }}
              <ExternalLink class="h-3 w-3 ml-1" />
            </a>
          </nav>
        </div>
      </div>

      <!-- Separator -->
      <hr class="my-8 border-border" />

      <!-- Bottom Section -->
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div class="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>© {{ currentYear }} Björn Pfoster. Made with</span>
          <Heart class="h-4 w-4 text-red-500 fill-current" />
          <span>in Zug, Switzerland</span>
        </div>

        <div class="flex items-center space-x-4 text-sm text-muted-foreground">
          <a href="pp" class="hover:text-foreground transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="tos" class="hover:text-foreground transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Heart, Github, Linkedin, Mail, ExternalLink } from 'lucide-vue-next'

const currentYear = new Date().getFullYear()

const links = {
  social: [
    { name: 'GitHub', icon: Github, href: 'https://github.com/d4rkmindz' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/bj%C3%B6rn-pfoster/' },
    { name: 'Email', icon: Mail, href: 'mailto:info@darker.dev' }
  ],
  quick: [
    // { name: 'About', href: '' },
    // { name: 'Skills', href: '' },
  ],
  resources: [
    // { name: 'ServiceNow', href: 'https://servicenow.com/' },
    // // { name: 'Resume', href: '#' },
    // // { name: 'Case Studies', href: '#' },
    // { name: 'Certifications', href: 'https://servicenow.com/' }
  ]
}
</script>
