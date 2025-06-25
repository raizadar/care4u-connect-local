
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, FileText, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AdminDashboard = () => {
  const { toast } = useToast();

  const handleApprove = (id: string, type: string) => {
    toast({
      title: `${type} approved`,
      description: `The ${type.toLowerCase()} has been approved successfully.`,
    });
  };

  const handleReject = (id: string, type: string) => {
    toast({
      title: `${type} rejected`,
      description: `The ${type.toLowerCase()} has been rejected.`,
      variant: "destructive",
    });
  };

  const handleBlock = (userId: string, userName: string) => {
    toast({
      title: "User blocked",
      description: `${userName} has been blocked from the platform.`,
      variant: "destructive",
    });
  };

  const pendingVerifications = [
    {
      id: '1',
      userName: 'John Doe',
      email: 'john@example.com',
      type: 'Identity',
      submittedAt: '2024-01-20',
      status: 'pending'
    },
    {
      id: '2',
      userName: 'Jane Smith',
      email: 'jane@example.com',
      type: 'Background Check',
      submittedAt: '2024-01-19',
      status: 'pending'
    }
  ];

  const allRequests = [
    {
      id: '1',
      title: 'Help with grocery shopping',
      seeker: 'Sarah Cohen',
      status: 'active',
      category: 'Shopping',
      created: '2024-01-20',
      matches: 3
    },
    {
      id: '2',
      title: 'Ride to medical appointment',
      seeker: 'David Levi',
      status: 'matched',
      category: 'Transportation',
      created: '2024-01-19',
      matches: 1
    },
    {
      id: '3',
      title: 'Help with moving boxes',
      seeker: 'Anonymous User',
      status: 'completed',
      category: 'Moving',
      created: '2024-01-18',
      matches: 1
    }
  ];

  const reports = [
    {
      id: '1',
      reporter: 'User123',
      reported: 'Helper456',
      reason: 'Inappropriate behavior',
      status: 'pending',
      date: '2024-01-20'
    },
    {
      id: '2',
      reporter: 'Helper789',
      reported: 'Seeker012',
      reason: 'No-show',
      status: 'reviewed',
      date: '2024-01-19'
    }
  ];

  const users = [
    {
      id: '1',
      name: 'Sarah Cohen',
      email: 'sarah@example.com',
      roles: ['seeker', 'helper'],
      status: 'active',
      joined: '2024-01-15',
      helpCount: 12
    },
    {
      id: '2',
      name: 'David Levi',
      email: 'david@example.com',
      roles: ['helper'],
      status: 'active',
      joined: '2024-01-10',
      helpCount: 25
    },
    {
      id: '3',
      name: 'Blocked User',
      email: 'blocked@example.com',
      roles: ['seeker'],
      status: 'blocked',
      joined: '2024-01-05',
      helpCount: 2
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">523</div>
            <div className="text-sm text-gray-600">Active Requests</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-amber-600" />
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-600">Pending Verifications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-gray-600">Reports</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="verifications" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="verifications">Verifications</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="verifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingVerifications.map((verification) => (
                    <TableRow key={verification.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{verification.userName}</div>
                          <div className="text-sm text-gray-600">{verification.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{verification.type}</Badge>
                      </TableCell>
                      <TableCell>{verification.submittedAt}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(verification.id, 'Verification')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(verification.id, 'Verification')}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Help Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Seeker</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Matches</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.title}</TableCell>
                      <TableCell>{request.seeker}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          request.status === 'active' ? 'bg-green-100 text-green-800' :
                          request.status === 'matched' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{request.matches}</TableCell>
                      <TableCell>{request.created}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reported User</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.reporter}</TableCell>
                      <TableCell>{report.reported}</TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>
                        <Badge className={
                          report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleBlock(report.id, report.reported)}
                          >
                            Block User
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Helps</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {user.roles.map((role) => (
                            <Badge key={role} variant="outline" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          user.status === 'active' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.helpCount}</TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          {user.status === 'active' ? (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleBlock(user.id, user.name)}
                            >
                              Block
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Unblock
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
