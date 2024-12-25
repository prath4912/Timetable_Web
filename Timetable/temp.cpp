#include <bits/stdc++.h>
using namespace std;



int main() {
	// your code goes here
	int t ;
	cin>>t ;
	while(t--)
	{
		
	    int n ;
	    cin>>n ;
	    string s ;
	    cin>>s ;
	    
	    int count = 0 ;
	    int i = 0 ;
	    while(i< s.size())
	    {
	        if(s[i]!=s[i+1])
	        {	            count++ ;

                if(s.size()==2)
                {
                    break ;
                }
	            
	            string left = s.substr(0 , i) ;
	            string right = s.substr(i+2 , n) ;
	            s = left + right ;
	            cout<<s<<endl ;
	            if(i>0)
	            i=i-1 ;
	            
	        }else
	        {
	            i++ ;
	        }
	        
	        
	    }
	    cout<<count<<endl ;
	    
	    if(count&1)
	    {
	        cout<<"Zlatan"<<endl; 
	    }else
	    {
	        cout<<"Ramos"<<endl; 
	    }
	}

}
