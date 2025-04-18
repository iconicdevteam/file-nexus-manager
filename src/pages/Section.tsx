
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { FileBrowser } from '@/components/files/FileBrowser';
import { FileSection } from '@/types/files';
import { getSectionById } from '@/utils/fileSections';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Section = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = getSectionById(sectionId || '');
  
  if (!section) {
    return (
      <Layout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Section not found. Please select a valid section.
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">{section.name} Files</h2>
          <FileBrowser initialSection={sectionId as FileSection} />
        </section>
      </div>
    </Layout>
  );
};

export default Section;
