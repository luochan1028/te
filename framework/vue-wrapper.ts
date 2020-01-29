import { ComponentPublicInstance } from 'vue'

import { DOMWrapper } from './dom-wrapper'
import { WrapperAPI } from './types'
import { ErrorWrapper } from './error-wrapper'

export class VueWrapper implements WrapperAPI {
  vm: ComponentPublicInstance

  constructor(vm: ComponentPublicInstance) {
    this.vm = vm
  }

  classes(): string[] {
    throw Error('TODO: Implement VueWrapper#classes')
  }

  exists() {
    return true
  }

  html() {
    return this.vm.$el.outerHTML
  }

  text() {
    return this.vm.$el.textContent
  }

  find<T extends Element>(selector: string): DOMWrapper<T> | ErrorWrapper {
    const result = this.vm.$el.querySelector(selector) as T
    if (result) {
      return new DOMWrapper(result)
    }

    return new ErrorWrapper(selector)
  }

  findAll<T extends Element>(selector: string): DOMWrapper<T>[] {
    const results = (this.vm.$el as Element).querySelectorAll<T>(selector)
    return Array.from(results).map(x => new DOMWrapper(x))
  }

  trigger(selector: string) { 
    throw Error('TODO: Implement VueWrapper#trigger')
  }
}

export function createWrapper(vm: ComponentPublicInstance): VueWrapper {
  return new VueWrapper(vm)
}