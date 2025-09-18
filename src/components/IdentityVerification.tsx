import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface IdentityVerificationProps {
  onSuccess?: () => void;
}

export function IdentityVerification({ onSuccess }: IdentityVerificationProps) {
  const [documentType, setDocumentType] = useState("");
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [verification, setVerification] = useState<any>(null);
  
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const { user } = useAuth();

  const documentTypes = [
    { value: "passport", label: "Passport" },
    { value: "residence_card", label: "Residence Card" },
    { value: "national_id", label: "National ID" },
    { value: "drivers_license", label: "Driver's License" }
  ];

  const handleFileSelect = (type: 'front' | 'back', file: File | null) => {
    if (file && !file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    if (type === 'front') {
      setFrontFile(file);
    } else {
      setBackFile(file);
    }
  };

  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('identity-documents')
      .upload(path, file, { upsert: true });

    if (error) throw error;
    return data.path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit verification",
        variant: "destructive",
      });
      return;
    }

    if (!documentType || !frontFile) {
      toast({
        title: "Missing information",
        description: "Please select document type and upload front image",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const timestamp = Date.now();
      const frontPath = `${user.id}/front_${timestamp}.${frontFile.name.split('.').pop()}`;
      const backPath = backFile ? `${user.id}/back_${timestamp}.${backFile.name.split('.').pop()}` : null;

      // Upload files
      const frontUrl = await uploadFile(frontFile, frontPath);
      const backUrl = backFile ? await uploadFile(backFile, backPath) : null;

      // Save verification record
      const { error } = await supabase
        .from('identity_verifications')
        .upsert({
          user_id: user.id,
          document_type: documentType,
          document_front_url: frontUrl,
          document_back_url: backUrl,
          verification_status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Verification submitted",
        description: "Your identity verification has been submitted for review",
      });

      // Reset form
      setDocumentType("");
      setFrontFile(null);
      setBackFile(null);
      if (frontInputRef.current) frontInputRef.current.value = "";
      if (backInputRef.current) backInputRef.current.value = "";
      
      onSuccess?.();
    } catch (error) {
      console.error('Verification error:', error);
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-chart-bull" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-chart-bear" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-chart-bull">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Pending Review</Badge>;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Identity Verification</h3>
      </div>

      {verification ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              {getStatusIcon(verification.verification_status)}
              <div>
                <p className="font-medium capitalize">{verification.document_type.replace('_', ' ')}</p>
                <p className="text-sm text-muted-foreground">
                  Submitted {new Date(verification.submitted_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            {getStatusBadge(verification.verification_status)}
          </div>
          
          {verification.admin_notes && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium mb-1">Admin Notes:</p>
              <p className="text-sm text-muted-foreground">{verification.admin_notes}</p>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Document Type</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Front of Document *</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
              {frontFile ? (
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5 text-chart-bull" />
                  <span className="text-sm">{frontFile.name}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setFrontFile(null);
                      if (frontInputRef.current) frontInputRef.current.value = "";
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Click to upload front of document</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => frontInputRef.current?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              )}
              <input
                ref={frontInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect('front', e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div>
            <Label>Back of Document (if applicable)</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
              {backFile ? (
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5 text-chart-bull" />
                  <span className="text-sm">{backFile.name}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setBackFile(null);
                      if (backInputRef.current) backInputRef.current.value = "";
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Click to upload back of document</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => backInputRef.current?.click()}
                  >
                    Choose File
                  </Button>
                </div>
              )}
              <input
                ref={backInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect('back', e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Verification Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Document must be clear and readable</li>
              <li>All corners of the document must be visible</li>
              <li>Document must be valid and not expired</li>
              <li>Images should be in good lighting</li>
            </ul>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary" 
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              "Submit for Verification"
            )}
          </Button>
        </form>
      )}
    </Card>
  );
}