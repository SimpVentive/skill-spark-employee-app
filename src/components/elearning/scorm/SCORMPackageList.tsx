
import SCORMPackageCard from './SCORMPackageCard';

interface SCORMPackage {
  id: string;
  title: string;
  version: string;
  status: 'active' | 'inactive';
  launchUrl: string;
  manifestPath?: string;
  uploadedAt: string;
  lastLaunched?: string;
}

interface SCORMPackageListProps {
  packages: SCORMPackage[];
  onLaunch: (pkg: SCORMPackage) => void;
}

const SCORMPackageList = ({ packages, onLaunch }: SCORMPackageListProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">SCORM Packages</h3>
      <div className="grid gap-4">
        {packages.map((pkg) => (
          <SCORMPackageCard 
            key={pkg.id} 
            package={pkg} 
            onLaunch={onLaunch}
          />
        ))}
      </div>
    </div>
  );
};

export default SCORMPackageList;
