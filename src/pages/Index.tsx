
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { FileBrowser } from '@/components/files/FileBrowser';
import { STORAGE_SERVICES } from '@/utils/storageServices';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatBytes } from '@/utils/storageServices';
import { Database, HardDrive, Cloud } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Storage Services Dashboard */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Storage Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {STORAGE_SERVICES.map(service => (
              <Card key={service.id} className={`${!service.connected && 'opacity-60'}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {service.id === 'dropbox' && <Database className="h-5 w-5 text-primary" />}
                      {service.id === 'google-drive' && <Cloud className="h-5 w-5 text-primary" />}
                      {service.id === 'onedrive' && <Cloud className="h-5 w-5 text-primary" />}
                      {service.id === 'local' && <HardDrive className="h-5 w-5 text-primary" />}
                      <CardTitle className="text-base">{service.name}</CardTitle>
                    </div>
                    <Badge variant={service.connected ? "outline" : "secondary"}>
                      {service.connected ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </div>
                  <CardDescription>
                    {service.connected ? 
                      `${formatBytes(service.usedSpace)} / ${formatBytes(service.totalSpace)}` :
                      'Not connected'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {service.connected && (
                    <Progress
                      value={(service.usedSpace / service.totalSpace) * 100}
                      className="h-2"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Files */}
        <section>
          <h2 className="text-xl font-semibold mb-4">All Files</h2>
          <FileBrowser />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
