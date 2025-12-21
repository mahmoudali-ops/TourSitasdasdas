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
  isScrolledd = false;
  isBrowser = typeof window !== 'undefined';


  @HostListener('window:scroll')
  onScroll() {
    if (!this.isBrowser) return;
    this.isScrolledd = window.scrollY > 50;
  }

  isScrolled = false;
  isOffcanvasOpen = false;
  activeDropdown: string | null = null;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
  }

  ngOnInit() {
    this.onWindowScroll();
  }

  // Toggle Offcanvas Menu
  toggleOffcanvas() {
    this.isOffcanvasOpen = !this.isOffcanvasOpen;
    
    // Prevent body scroll when offcanvas is open
    if (this.isOffcanvasOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      this.activeDropdown = null; // Close all dropdowns
    }
  }

  // Close Offcanvas Menu
  closeOffcanvas() {
    this.isOffcanvasOpen = false;
    document.body.style.overflow = 'auto';
    this.activeDropdown = null;
  }

  // Toggle Dropdown
  toggleDropdown(event: Event, dropdownName: string) {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.activeDropdown === dropdownName) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = dropdownName;
    }
  }

  // Close offcanvas when clicking outside on mobile
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isOffcanvasOpen && window.innerWidth <= 991) {
      if (!target.closest('.offcanvas-menu') && 
          !target.closest('.hamburger-btn')) {
        this.closeOffcanvas();
      }
    }
  }

  // Close offcanvas on escape key
  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isOffcanvasOpen) {
      this.closeOffcanvas();
    }
  }
  


  constructor(
    private langService: LanguageService,
    private translationService: TranslationService
  ) {}

  changeLang(lang: 'en' | 'de' | 'nl') {
    this.langService.setLanguage(lang);
    // تحديث TranslationService أيضاً لضمان التزامن
    this.translationService.setLang(lang);
  }
}
