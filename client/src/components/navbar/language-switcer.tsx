'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { Check, Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Locale } from '@/src/i18n/locales';
import Image from 'next/image';

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'az', name: 'Azərbaycanca', flag: '🇦🇿' }
];

export default function LanguageSwitcher() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'ru';
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: Locale) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 font-sans font-medium transition-all'
        >
          <Globe className='h-4 w-4 text-black/50' />
          <span className='text-xl'>{languages.find((language) => language.code === locale)?.flag}</span>
          <span className='font-medium font-sans text-[12px] tracking-[1.68px] text-black/50'>{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='min-w-[160px] border border-gray-200'>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              'cursor-pointer font-sans transition-colors',
              locale === language.code ? 'bg-amber-50 text-primary font-semibold' : 'hover:bg-gray-50'
            )}
          >
            <span className='flex items-center justify-between gap-3 w-full'>
              <span className='flex items-center gap-3'>
                <span className='text-xl'>{language.flag}</span>
                <span className='flex-1'>{language.name}</span>
              </span>
              {locale === language.code && <Check className='h-4 w-4' />}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
