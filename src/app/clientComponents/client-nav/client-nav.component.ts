import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { TranslatedPipe } from '../../core/pipes/translate.pipe';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-client-nav',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslatedPipe],
  templateUrl: './client-nav.component.html',
  styleUrl: './client-nav.component.css'
})
export class ClientNavComponent implements OnInit {
  isBrowser = typeof window !== 'undefined';

  isScrolled = false;
  isOffcanvasOpen = false;
  activeDropdown: string | null = null;

  constructor(
    private langService: LanguageService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.onWindowScroll();
  }

  // ===============================
  // Scroll Effect
  // ===============================
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) return;

    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop || 0;

    this.isScrolled = scrollPosition > 50;
  }

  // ===============================
  // Offcanvas Toggle
  // ===============================
  toggleOffcanvas(): void {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;

    if (this.isOffcanvasOpen) {
      // iOS SAFE way (instead of overflow: hidden)
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      this.resetBody();
      this.activeDropdown = null;
    }
  }

  closeOffcanvas(): void {
    this.isOffcanvasOpen = false;
    this.resetBody();
    this.activeDropdown = null;
  }

  private resetBody(): void {
    document.body.style.position = '';
    document.body.style.width = '';
  }

  // ===============================
  // Dropdown Toggle
  // ===============================
  toggleDropdown(event: Event, dropdownName: string): void {
    event.preventDefault();
    event.stopPropagation();

    this.activeDropdown =
      this.activeDropdown === dropdownName ? null : dropdownName;
  }

  // ===============================
  // Close on Outside Click (Mobile)
  // ===============================
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOffcanvasOpen || window.innerWidth > 991) return;

    const target = event.target as HTMLElement;

    if (
      !target.closest('.offcanvas-menu') &&
      !target.closest('.hamburger-btn')
    ) {
      this.closeOffcanvas();
    }
  }

  // ===============================
  // Close on ESC
  // ===============================
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOffcanvasOpen) {
      this.closeOffcanvas();
    }
  }

  // ===============================
  // Language Change
  // ===============================
  changeLang(lang: 'en' | 'de' | 'nl'): void {
    this.langService.setLanguage(lang);
    this.translationService.setLang(lang);
  }
}