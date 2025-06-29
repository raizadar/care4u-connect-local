
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface HelpType {
  id: string;
  categoryId: string;
  labelEN: string;
  labelHE: string;
}

interface Category {
  id: string;
  labelEN: string;
  labelHE: string;
  helpTypes: HelpType[];
}

interface HierarchicalSkillSelectorProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const HierarchicalSkillSelector = ({ selectedSkills, onSkillsChange }: HierarchicalSkillSelectorProps) => {
  const { language } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Mock hierarchical data - in real app this would come from API
  const categories: Category[] = [
    {
      id: 'transport',
      labelEN: 'Transportation',
      labelHE: 'הסעות ותחבורה',
      helpTypes: [
        { id: 'transport_car', categoryId: 'transport', labelEN: 'Car rides', labelHE: 'הסעות ברכב' },
        { id: 'transport_medical', categoryId: 'transport', labelEN: 'Medical appointments', labelHE: 'ליווי לרופא' },
        { id: 'transport_shopping', categoryId: 'transport', labelEN: 'Shopping trips', labelHE: 'הסעות לקניות' }
      ]
    },
    {
      id: 'household',
      labelEN: 'Household Tasks',
      labelHE: 'עבודות בית',
      helpTypes: [
        { id: 'household_cleaning', categoryId: 'household', labelEN: 'Cleaning', labelHE: 'ניקיון' },
        { id: 'household_repairs', categoryId: 'household', labelEN: 'Minor repairs', labelHE: 'תיקונים קלים' },
        { id: 'household_gardening', categoryId: 'household', labelEN: 'Gardening', labelHE: 'גינון' }
      ]
    },
    {
      id: 'social',
      labelEN: 'Social Support',
      labelHE: 'תמיכה חברתית',
      helpTypes: [
        { id: 'social_companionship', categoryId: 'social', labelEN: 'Companionship', labelHE: 'חברותא' },
        { id: 'social_phone', categoryId: 'social', labelEN: 'Phone calls', labelHE: 'שיחות טלפון' },
        { id: 'social_visits', categoryId: 'social', labelEN: 'Home visits', labelHE: 'ביקורי בית' }
      ]
    },
    {
      id: 'tech',
      labelEN: 'Technology Help',
      labelHE: 'עזרה טכנולוגית',
      helpTypes: [
        { id: 'tech_computer', categoryId: 'tech', labelEN: 'Computer help', labelHE: 'עזרה במחשב' },
        { id: 'tech_phone', categoryId: 'tech', labelEN: 'Smartphone setup', labelHE: 'הגדרת סמארטפון' },
        { id: 'tech_internet', categoryId: 'tech', labelEN: 'Internet services', labelHE: 'שירותי אינטרנט' }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategoryState = (category: Category): 'checked' | 'unchecked' | 'indeterminate' => {
    const categorySkills = category.helpTypes.map(ht => ht.id);
    const selectedCategorySkills = categorySkills.filter(skill => selectedSkills.includes(skill));
    
    if (selectedCategorySkills.length === 0) return 'unchecked';
    if (selectedCategorySkills.length === categorySkills.length) return 'checked';
    return 'indeterminate';
  };

  const toggleCategory_Skills = (category: Category) => {
    const categorySkills = category.helpTypes.map(ht => ht.id);
    const state = getCategoryState(category);
    
    let newSelectedSkills: string[];
    if (state === 'checked') {
      // Unselect all category skills
      newSelectedSkills = selectedSkills.filter(skill => !categorySkills.includes(skill));
    } else {
      // Select all category skills
      newSelectedSkills = [...new Set([...selectedSkills, ...categorySkills])];
    }
    
    onSkillsChange(newSelectedSkills);
  };

  const toggleSkill = (skillId: string) => {
    const newSelectedSkills = selectedSkills.includes(skillId)
      ? selectedSkills.filter(skill => skill !== skillId)
      : [...selectedSkills, skillId];
    
    onSkillsChange(newSelectedSkills);
  };

  // Auto-expand categories that have selected skills
  useEffect(() => {
    const categoriesToExpand = new Set<string>();
    categories.forEach(category => {
      if (category.helpTypes.some(ht => selectedSkills.includes(ht.id))) {
        categoriesToExpand.add(category.id);
      }
    });
    setExpandedCategories(categoriesToExpand);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">תחומי עזרה</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {categories.map((category) => {
          const categoryState = getCategoryState(category);
          const isExpanded = expandedCategories.has(category.id);
          
          return (
            <div key={category.id} className="border rounded-lg p-3">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {isExpanded ? 
                    <ChevronDown className="w-4 h-4" /> : 
                    <ChevronRight className="w-4 h-4" />
                  }
                </button>
                
                <Checkbox
                  checked={categoryState === 'checked' ? true : categoryState === 'indeterminate' ? 'indeterminate' : false}
                  onCheckedChange={() => toggleCategory_Skills(category)}
                  className="data-[state=indeterminate]:bg-blue-500"
                />
                
                <label 
                  className="font-medium cursor-pointer flex-1"
                  onClick={() => toggleCategory_Skills(category)}
                >
                  {language === 'he' ? category.labelHE : category.labelEN}
                </label>
              </div>

              {/* Help Types */}
              {isExpanded && (
                <div className="mr-8 space-y-2">
                  {category.helpTypes.map((helpType) => (
                    <div key={helpType.id} className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedSkills.includes(helpType.id)}
                        onCheckedChange={() => toggleSkill(helpType.id)}
                      />
                      <label 
                        className="cursor-pointer text-sm"
                        onClick={() => toggleSkill(helpType.id)}
                      >
                        {language === 'he' ? helpType.labelHE : helpType.labelEN}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default HierarchicalSkillSelector;
