#include <bits/stdc++.h>
using namespace std;

int main() {
	// your code goes here
	long long int t ;
	cin>>t ;
	
	while(t--)
	{
	   long long int n , l ;
	    cin>>n>>l ;
	    long long int low1 = l/2 ;
        long long int low = low1-1 ;

	    while(low+low1 >= l && low>=0  )
	    {
	        low1 = low;
	        low-- ;
	    }
	    
	    if(low>1)
	    {
            low = 1 ;
	        while(low<=low1 && n>0)
	        {
	            cout<<low<<" " ;
                low++ ;
                n-- ;
	        }

            if(n>0)
            {
                long long int prev1 = low1 ; 
                long long int prev2 = l ;
                
                while (n--)
                {
                    long long int ans = prev1 + prev2  ;
                    cout<<ans<<" " ;
                    prev1 = prev2 ;
                    prev2 = ans ;
                }
                
            }
	    }else
        {
            long long int prev1 = 1; 
            long long int prev2 = l ;
            cout<<prev1<<" " ;
            n-- ;
            while(n--)
            {
                long long int ans = prev1 + prev2 ;
                cout<<ans<<" " ;
                prev1 = prev2 ;
                prev2 = ans ;
                
            }
        }



        
	    cout<<endl ;
	    
	    
	}

}
