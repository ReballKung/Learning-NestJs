import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getProfileData() {
    return {
      name: "Sukrit Saeliao",
      role: "FullStack",
      skills: ["Nuxt 3", "Vue 3", "TypeScript"]
    };
  }

  getSkillData() {
    return {
      skills: ["Nuxt 3", "Vue 3", "TypeScript"]
    };
  }
}
