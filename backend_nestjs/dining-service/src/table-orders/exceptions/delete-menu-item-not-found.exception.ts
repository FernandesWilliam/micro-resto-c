import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

import { AddMenuItemDto } from '../dto/add-menu-item.dto';

export class DeleteMenuItemNotFoundException extends ErrorDto {
  constructor(menuItemId: string) {
    super(HttpStatus.NOT_FOUND, `not item found in the table lines with id :${menuItemId}` );
  }
}
