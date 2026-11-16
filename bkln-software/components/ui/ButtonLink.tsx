import Link from 'next/link'
import type { ComponentProps } from 'react'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './button-styles'

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** Enlace con aspecto de botón (en vez de un <button> dentro de un <a>). */
export function ButtonLink({ variant = 'primary', size = 'md', className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...props} />
}

type ExternalButtonProps = ComponentProps<'a'> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** Lo mismo para enlaces externos (WhatsApp, correo, mapas). */
export function ExternalButton({ variant = 'primary', size = 'md', className, ...props }: ExternalButtonProps) {
  return <a target="_blank" rel="noopener noreferrer" className={buttonClasses(variant, size, className)} {...props} />
}
