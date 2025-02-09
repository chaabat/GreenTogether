import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="mt-12 bg-gray-900">
      <div class="container mx-auto px-4 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex items-center gap-3">
            <a routerLink="/" class="flex items-center gap-3 hover:opacity-90">
              <img
                src="https://res.cloudinary.com/dlwyetxjd/image/upload/v1738660430/yifljpmi4pg3mstvvfoy.png"
                alt="GreenTogether Logo"
                class="h-8 w-8 object-contain"
              />

              <span
                class="text-2xl font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent"
              >
                GreenTogether
              </span>
            </a>
          </div>

          <div class="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h3 class="text-white font-medium mb-4">Company</h3>
              <div class="space-y-3">
                <a
                  href="#"
                  class="block text-sm text-gray-400 hover:text-white transition-colors"
                  >About</a
                >
                <a
                  href="#"
                  class="block text-sm text-gray-400 hover:text-white transition-colors"
                  >Careers</a
                >
                <a
                  href="#"
                  class="block text-sm text-gray-400 hover:text-white transition-colors"
                  >Press</a
                >
              </div>
            </div>
            <div>
              <h3 class="text-white font-medium mb-4">Legal</h3>
              <div class="space-y-3">
                <a
                  href="#"
                  class="block text-sm text-gray-400 hover:text-white transition-colors"
                  >Privacy</a
                >
                <a
                  href="#"
                  class="block text-sm text-gray-400 hover:text-white transition-colors"
                  >Terms</a
                >
                <a
                  href="#"
                  class="block text-sm text-gray-400 hover:text-white transition-colors"
                  >Cookie Policy</a
                >
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-gray-800">
          <div
            class="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <span class="text-sm text-gray-400"
              >© 2025 GreenTogether. All rights reserved.</span
            >
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
