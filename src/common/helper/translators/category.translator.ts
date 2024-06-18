/**
 * Category translator
 *
 */

import { Language } from 'src/common/enum';
import { ChildCategory } from 'src/models/categories/children/entities/child.entity';
import { ParentCategory } from 'src/models/categories/parents/entities/parent.entity';

class ChildCategoryResponse {
    id!: number;
    fullName!: string;
    parentCategory: ParentCategoryResponse | null = null;

    constructor(category: ChildCategory, lang: Language) {
        this.id = category.id;
        this.fullName =
            lang === Language.VI
                ? category.name
                : lang === Language.EN
                    ? category.nameEn
                    : category.nameKor;
        if (category.parentCategory) {
            this.parentCategory = new ParentCategoryResponse(
                category.parentCategory,
                lang,
            );
            this.parentCategory.id = category.parentCategory.id;
            this.parentCategory.fullName =
                lang === Language.VI
                    ? category.parentCategory.name
                    : lang === Language.EN
                        ? category.parentCategory.nameEn
                        : category.parentCategory.nameKor;
        }
    }
}

class ParentCategoryResponse {
    id!: number;
    fullName!: string;
    // defaultPostImage!: string;

    constructor(category: ParentCategory, lang: Language) {
        this.id = category.id;
        this.fullName =
            lang === Language.VI
                ? category.name
                : lang === Language.EN
                    ? category.nameEn
                    : category.nameKor;
        // this.defaultPostImage = category.defaultPostImage;
    }
}

export function categoryTranslator(
    category: ChildCategory | ParentCategory,
    lang: Language,
) {
    if (!category) return null;
    if (category instanceof ChildCategory) {
        const childCategory = new ChildCategoryResponse(category, lang);
        return childCategory;
    }
    if (category instanceof ParentCategory) {
        const parentCategory = new ParentCategoryResponse(category, lang);
        return parentCategory;
    }
    return null;
}
